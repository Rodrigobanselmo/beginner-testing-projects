
 import firebase from '@react-native-firebase/app';
 import auth from '@react-native-firebase/auth';
 import NetInfo from "@react-native-community/netinfo";
 import { GoogleSignin } from '@react-native-community/google-signin';
 GoogleSignin.configure({
  webClientId: "258525509295-qumkcv4mh992ujgmriveuiagamtqujvi.apps.googleusercontent.com",
});


export function infoNet(ifTrue,ifFalse) {
  NetInfo.fetch().then(state => {
    if (state.isConnected) {
      ifTrue()
    } else {
      ifFalse()
    }
  });
}

//consigo logar sem cadastro e meu usuario fica 
export function ChangeUserData(data,onModalVisible,onClose,dispatchUserDataChange,onSetModalVisible) {
  onModalVisible(true,'loaderText') 
  onClose()
  dispatchUserDataChange(data)
  onSetModalVisible(false)
}

export function SignInAnonymously() {
    auth().signInAnonymously()
    .then((x) => {
      console.log(x);
    })
    .catch(error => {
      if (error.code === 'auth/operation-not-allowed') {
        console.log('Enable anonymous in your firebase console.');
      }
      console.error(error);
    });
}
 
export function SignInEmail(email,senha,onModalVisible,onAnimationModal,dispatchUserSign) {
  
  let auth = firebase.auth()
  if (email.trim() == '' || senha.trim() == '') {
    onAnimationModal('Preencha todos os campos para fazer o login.')
  }  else if (senha.trim().length < 6) {
    onAnimationModal('Senha necessita ter no minimo 6 digitos.')
  } else {
    onModalVisible(true,'loaderText') 
    auth.signInWithEmailAndPassword(email,senha)
    .then((loggedUser) =>{
      dispatchUserSign(loggedUser.user)
    })
    .catch(error=>{
      if (error.code === 'auth/user-not-found') {
        onModalVisible(true,'info','Usuario de email não cadastrado, por vafor cadastre-se antes de logar!','Erro no Login');
      }
      else if (error.code === 'auth/wrong-password') {
        onModalVisible(true,'info','Senha invalida ou usuário não possui senha (email pode já ter sido cadastrado por outro método)!','Erro no Login')
      }
      else if (error.code === 'auth/network-request-failed') {
        onModalVisible(true,'info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!','Erro no Login');
      }
      else if (error.code === 'auth/invalid-email') {
        onModalVisible(true,'info','Endereço de e-mail mal formatado','Erro no Login');
      }
      else {
        onModalVisible(true,'info',error.message,'Erro no Login');
      }
    })
  }
}

export function CreateEmail(email,senha,confirmePassword,onModalVisible,onAnimationModal,dispatchUserCreate) {
  
  let auth = firebase.auth()
  if (email.trim() == '' || senha.trim() == '') {
    onAnimationModal('Preencha todos os campos para fazer o login.')
  }  else if (senha.trim().length < 6) {
    onAnimationModal('Senha necessita ter no minimo 6 digitos.')
  } else if (senha.trim() != confirmePassword.trim()) {
    onAnimationModal('As senhas devem ser iguais.')
  } else { 
    onModalVisible(true,'loaderText')
    auth.createUserWithEmailAndPassword(email,senha)
    .then((loggedUser) => {
      dispatchUserCreate(loggedUser.user)
    })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      onModalVisible(true,'info','O endereço de email já esta cadastrado!','Erro no Cadastro');
    } else if (error.code === 'auth/network-request-failed') {
      onModalVisible(true,'info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!','Erro no Cadastro');
    } else if (error.code === 'auth/invalid-email','Erro no Cadastro') {
      onModalVisible(true,'info','Endereço de e-mail mal formatado!','Erro no Cadastro');
    } else {
      onModalVisible(true,'info',error.message,'Erro no Cadastro');
    }
    console.log(error);
  });}
}

export function EmailSignAfter(Password,newPassword,isValidPass,isValidConfirmePass,isValidSConfirmePass,onAnimationModal,onModalVisible,onClose,dispatchUserDataChange) {
  if (Password == '' || newPassword == '') {
    onAnimationModal('Complete todos os campos antes de prosseguir')
  } else if (!isValidPass|| ( newPassword && !isValidConfirmePass)) {
    onAnimationModal('Senha inválida, ela deve possuir no mínimo 6 digitos')
  } else if (!isValidConfirmePass||isValidSConfirmePass===false) {
    onAnimationModal('As senhas devem ser iguais')
  } else if (Password == newPassword) {
    onAnimationModal('A nova senha deve ser diferente da atual')
  } else {
    onClose()
    onModalVisible(true,'loaderText')

    function onEmailSignAfter() {
      var user = firebase.auth().currentUser;
      firebase.auth().fetchSignInMethodsForEmail(user.email).then(function(response) {
        if (!response.includes("password")) {
          var credentials = firebase.auth.EmailAuthProvider.credential(
              user.email,
              Password
            );
            user.linkWithCredential(credentials).then(function() {
              dispatchUserDataChange({uid:user.uid,changeData:{providerId:[...response,"password"]},action:'none'})
              onModalVisible(true,'info','Senha criada com sucesso','Senha')
            }).catch(function(error) {
              if (error.code == 'auth/requires-recent-login') {  
                onGoogleReauthenticate()
              }  else if (error.code === 'auth/network-request-failed') {
                  onModalVisible(true,'info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!','Erro')
              } else {
                  onModalVisible(true,'info',error.message,'Erro')
              }
              console.log(error.code)
            });
        } else {
          user.updatePassword(Password).then(function() {
            onModalVisible(true,'info','Senha trocada com sucesso',"Senha Trocada")
          }).catch(function(error) {
            if (error.code === 'auth/network-request-failed') {
              onModalVisible(true,'info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!')
            } else {
              onModalVisible(true,'info',error.message)
            }
            console.log(error,'     code     ',error.code)
          });
        }
      }).catch(function(error) {
        if (error.code === 'auth/network-request-failed') {
          onModalVisible(true,'info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!')
        } else {
          onModalVisible(true,'info',error.message)
        }
        console.log(error)
      });
    }

    async function onGoogleReauthenticate() {
      try {
        var user = firebase.auth().currentUser;
        await GoogleSignin.hasPlayServices();
        const { idToken } = await GoogleSignin.signIn();
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        return user.reauthenticateWithCredential(googleCredential).then(function() {
          onEmailSignAfter()
        }).catch(function(error) {
          console.log('erro',error.code)
          if (error.code == 'auth/user-mismatch') {
              onModalVisible(true,'info',`Para autenticar é necesário utilizar a conta Google correspondente ao email: ${user.email}`)
          }  else if (error.code === 'auth/network-request-failed') {
              onModalVisible(true,'info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!')
          } else {
              onModalVisible(true,'info',error.message)
          }
        });
      } catch (error) {
        console.log('erro',error.code)
        if (error.code==12501 || error.code==-5) {  
            onModalVisible(true,'info','Operação cancelada');
        }  else if (error.code === 'auth/network-request-failed') {
            onModalVisible(true,'info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!')
        } else {
            onModalVisible(true,'info',error.message)
        }
      }
    }

    function EmailAuth() {
      var user = firebase.auth().currentUser;
      var credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        Password
      );
      user.reauthenticateWithCredential(credentials).then(function() {
        onEmailSignAfter()
      }).catch(function(error) {
        if (error.code === 'auth/wrong-password') {
            onModalVisible(true,'info','Senha atual invalida')
          }  else if (error.code === 'auth/network-request-failed') {
            onModalVisible(true,'info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!')
        } else {
            onModalVisible(true,'info','Erro encontrado, tente novamente!')
        }
        console.log(error)
      });
    }

    if (newPassword) {
      EmailAuth()
    } else {
      onEmailSignAfter()
    }
  }
}

export function GoogleSignAfter(onModalVisible,unlink,providerIds,dispatchUserGoogle,dispatchUserDataChange) {

  
  var usuario = firebase.auth().currentUser;

  async function onGoogleButtonPress() {
    onModalVisible(true,'loaderText')
    try {
          await GoogleSignin.hasPlayServices();
          const { idToken, user } = await GoogleSignin.signIn();
          const googleCredential = auth.GoogleAuthProvider.credential(idToken);
          return usuario.linkWithCredential(googleCredential).then(function() {
            var userWithProvider = {
              providerId:[...providerIds,"google.com"],
              user:usuario,
              additionalUserInfo:{profile:{
                family_name: user.familyName,
                given_name: user.givenName, 
                picture: user.photo
              }}
            }
            dispatchUserGoogle(userWithProvider)
            onModalVisible(true,'info',`Conta Google:\n${user.email}\nadicionada com sucesso.`,'Sucesso')
          }).catch(function(error) {
            onModalVisible(true,'info',error.message,'Erro')
            console.log(error)
          });
      } catch (e) {
        if (e.code==12501 || e.code==-5) {  
          onModalVisible(true,'info','Operação cancelada');
      }  else if (e.code == 7) {
          onModalVisible(true,'info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!')
      } else {
          onModalVisible(true,'info','Algo falhou, tente novamente mais tarde');
      }
        console.log(e.code)
      }
  }

  async function unlinkAccount(providerId) {
    onModalVisible(true,'loaderText')
    if (providerIds.length == 1 && providerIds.includes('google.com')){
      onModalVisible(true,'info',`Se você deseja remover sua conta Google, é necessario cadastrar uma senha e email autenticado.`,'Aviso')
    } else {
      try {
        await GoogleSignin.revokeAccess();
        usuario.unlink(providerId).then(function() {
          dispatchUserDataChange({uid:usuario.uid,changeData:{providerId:[...providerIds].filter((i)=>i!=providerId)}})
      console.log('sucess')
      onModalVisible(true,'info',`Autenticação Google removida com sucesso de sua conta.`,'Sucesso')
    }).catch(function(error) {
      onModalVisible(true,'info',error.message,'erro')
      console.log(error)
    });
    } catch (err) {
        usuario.unlink(providerId).then(function() {
          console.log('sucess')
          onModalVisible(true,'info',`Autenticação Google removida com sucesso de sua conta.`,'Sucesso')
        }).catch(function(error) {
          onModalVisible(true,'info',error.message,'Erro')
          console.log(error)
        });
        console.log(err,err.code);
      }
    }
  }

  if (unlink) {
      onModalVisible(true,'option',
          {
            buttonConfirm:'Remover',
            buttonDelete:'Cancelar',
            title:'Remover Conta Google',
            subTitle:`Deseja realmente remover o acesso de sua conta a partir da autenticação Google?`,
            colorButton:{okButton:'#000',cancelButton:'green'}
          },
          ()=>unlinkAccount('google.com')
        )
  } else {
    onGoogleButtonPress()
  }  

}

export function GoogleSign(onModalVisible,dispatchUserGoogle) {
  onModalVisible(true,'loaderText')
  async function onGoogleButtonPress() {
    try {
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      return (
        auth().signInWithCredential(googleCredential).then((userLogin)=>{
        var userWithProvider = {...userLogin,providerId:["google.com"]}
          dispatchUserGoogle(userWithProvider)
        })
      );
    } catch (e) {
      if (e.code==12501 || e.code==-5) {  
          onModalVisible(true,'info','Operação cancelada','Erro no Login');
      }  else if (e.code == 7) {
          onModalVisible(true,'info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!','Erro no Login')
      } else {
          onModalVisible(true,'info','Algo falhou, tente novamente mais tarde','Erro no Login');
      }
        console.log(e.code)
    }
  }
  onGoogleButtonPress()

}

export function RedefinirSenha(email,onAnimationModal,setModalVisible,onModalVisible,onClose) {
  
  if (!email || email=='') {
    onAnimationModal('Informe seu email para redefinir sua senha')
  } else {
      onModalVisible(true,'loaderText')
      setModalVisible(false)
      var auth = firebase.auth();
      auth.sendPasswordResetEmail(email).then(function() {
          onClose()
          onModalVisible(true,'info','Email enviado com sucesso, verifique sua caixa de menssagens para mudança de senha','Envio de Email')
        // Email sent.
    }).catch(function(error) {
      setModalVisible(true)
      onModalVisible(false)
      if (error.code == 'auth/invalid-email') {
        onAnimationModal('Email com formatação inválida',1800)
      } else if (error.code == 'auth/user-not-found') {
        onAnimationModal('Endereço de email não encontrado',1800)
      }  else if (error.code === 'auth/network-request-failed') {
        onAnimationModal('Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!',1800)
      } else {
        onAnimationModal('Erro encontrado, tente novamente!',1800)
      }
      console.log(error,error.code)
    });
  } 
  
}

export function CheckEmailExists(setInfo) {
  //resposta [] com ou "passorw" ou ˜google.com˜ == ["google.com", "password"]
  var usuario = firebase.auth().currentUser;
  firebase.auth().fetchSignInMethodsForEmail(usuario.email).then(response=>{
      setInfo(response)
  }).catch(response=>{
   console.log(response)
  })
}


export function getCurrentUserReload(data,action,dispatchUserDataChange,onModalVisible,duble,localVerify) {
}


//setaskPass =>verifica se é input de email ou pass
//getCurrentUserReload => para recarregar o novo email dentro do Redux
export function updateUserEmail(email,oldPassword,askPass,setEmail,onAnimationModal,setModalVisible,onModalVisible,setaskPass,onClose,dispatchUserDataChange) {
  var user = firebase.auth().currentUser;
  if(askPass) {
    console.log('email',email)
    console.log('user.email',user.email)
    console.log('pass',oldPassword)
    if (!oldPassword || oldPassword.length <6) {
      onAnimationModal('Senha deve conter no minimo 6 digitos.')
    } else {
      console.log('email',email)
      console.log('user.email',user.email)
      console.log('pass',oldPassword)
      var credentials = firebase.auth.EmailAuthProvider.credential(
        user.email,
        oldPassword
      );
      onModalVisible(true,'loaderText')
      onClose()
      setaskPass(true)
      user.reauthenticateWithCredential(credentials).then(function() {
        updateEmail()
      }).catch(function(error) {
          onModalVisible(false)
          setModalVisible(true)
        if (error.code === 'auth/wrong-password') {
            onAnimationModal('Senha invalida',1800)
          }  else if (error.code === 'auth/network-request-failed') {
            onAnimationModal('Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!',1800)
        } else {
            onAnimationModal('Erro encontrado, tente novamente!',1800)
        }
        console.log(error)
      });
    }
  } else {
    if (!email || email=='') {
      onAnimationModal('Informe o novo endereço de email para altera-lo')
    } else {
      onModalVisible(true,'loaderText')
      setModalVisible()
      updateEmail()
    }
  }
  
  function updateEmail() {
    console.log(email)
    console.log(oldPassword)
    user.updateEmail(email)
    .then(function() {
      console.log('email',email)
      console.log('pass',oldPassword)
      dispatchUserDataChange({uid:user.uid,changeData:{email},action:'none'})
      setEmail('')
      setaskPass(false)
      onModalVisible(true,'info','Email alterado com sucesso, verifique sua caixa de menssagens para valida-lo','Alteração de Email')
      }).catch(function(error) {
          onModalVisible(false)
          setModalVisible(true)      
        if (error.code == 'auth/requires-recent-login') {
          console.log('email email',email)
          setaskPass(email)
          onClose()
          setTimeout(() => {setEmail(email)}, 400)
        } else if (error.code == 'auth/invalid-email') {
            onAnimationModal('Email com formatação inválida',1800)
        }  else if (error.code === 'auth/network-request-failed') {
            onAnimationModal('info','Falha de conexão com a internet, tente novamente quando estiver conectado a uma rede!',1800)
        } else if(error.code =='auth/email-already-in-use') {
            setaskPass(false)
            onAnimationModal(`Endereço de email ${email} já esta em uso!`,1800)
        } else if (error.code == 'auth/user-not-found') {
          onAnimationModal(`Endereço de email ${email} não encontrado`,1800)
        } else {
          onAnimationModal(error.message,1800)
        } 
        console.log(error.code)
      });
  }
  


}

export function LogOut(navigationActions,screenName,onModalVisible) {
  
  onModalVisible(true,'loaderText')

  const signOutFirebase = () => {
    auth()
    .signOut()
    .then(() => {
      setTimeout(() => {
        navigationActions(screenName)
        }, 1000); 
    })
    .catch(error=>{
        onModalVisible(true,'info','Algo falhou, verifique sua conexão com a internet');
      console.log(error) 
    });
  }

  const signOutGoogle = async () => {
    try {
      await GoogleSignin.revokeAccess();
      signOutFirebase()
    } catch (error) {
      if (error.code != 'SIGN_IN_REQUIRED' && error.code !=4 && error.code !=400) {
/*         setTimeout(() => {
          onModalVisible(true,'info','Algo falhou, tente novamente mais tarde');
        }, 500); */
        signOutFirebase()
      } else {
        signOutFirebase()
      }
      console.log(error,error.code);
    }
  };

  signOutGoogle()
}