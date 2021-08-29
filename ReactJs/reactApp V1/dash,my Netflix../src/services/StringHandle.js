export function AbreviarNome(fullName,limit) {

    function abreviarControl() {
        if (fullName.length > limit) {
            return abreviar(fullName,limit);
        }
        return fullName;
    }
      
    function abreviar(str) {
        const [nome, ...sobrenomes] = str.split(' ');
        const abreviaturas = sobrenomes.reduce((arr, str) => {
            const letraGrande = str.match(/[A-ZÖÄÅÀÁÂÃÌÍÒÓÉÊÚ]/);
            if (!letraGrande) return arr;
                return arr.concat(`${letraGrande[0]}.`);
        }, []);
        var abr = abreviaturas.slice(0,abreviaturas.length-1)
        var latName = sobrenomes.slice(-1)
        if([nome, ...abr,latName].join(' ').length> limit) {
            return [nome, ...abreviaturas].join(' ');
        } else {
            return [nome, ...abr,latName].join(' ');
        }
    }
            
    return abreviarControl()
}

export function AbreviarSobrenome(fullName,limit) {

    function abreviarControl() {
        if (fullName.length > limit) {
            return abreviar(fullName,limit);
        }
        return fullName;
    }
      
    function abreviar(str) {
        const [...sobrenomes] = str.split(' ');
        const abreviaturas = sobrenomes.reduce((arr, str) => {
            const letraGrande = str.match(/[A-ZÖÄÅÀÁÂÃÌÍÒÓÉÊÚ]/);
            if (!letraGrande) return arr;
                return arr.concat(`${letraGrande[0]}.`);
        }, []);
        var abr = abreviaturas.slice(0,abreviaturas.length-1)
        var latName = sobrenomes.slice(-1)
        if([...abr,latName].join(' ').length> limit) {
            return [...abreviaturas].join(' ');
        } else {
            return [...abr,latName].join(' ');
        }
    }
            
    return abreviarControl()
}

export function Colocar3dots(value,maxlimit) {

    if ((value).length > maxlimit) {
        return (((value).substring(0,maxlimit-3)) + '...')
    } else {
        return value
    }
            
}
   
//Aqui verifica se email é valido, se for poe o ICON CHECK TRUE e se não for, coloca ICON CHECK FALSE -- aqui nao faz nada se vc sair do input (OUTRO FUNÇÃO)
export function textInputChange(val,data,setData) {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if ( re.test(val.trim()) ) { 
        setData({
            ...data,
            emailAddress: val.trim(),
            warnMessage: {title:'',body:'',type:'none'}
        });
    } else {
        setData({
            ...data,
            emailAddress: val.trim(),
            warnMessage: {title:'',body:'',type:'none'}

        });
    }  
}

// Aqui ao sair do input ele verifica se ta certo e avisa se estiver errado
export function handleValidUser(val,data,setData) {
    
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
    if ( re.test(val.trim()) ) {
        console.log('object')
        setData({
            ...data,
            warnMessage: {title:'',body:'Verificando endereço de email',type:'load'}
        });
    }
    else if (val.trim().length !== 0) {
        setData({
            ...data,
            warnMessage: {title:'',body:'Email inserido com formatação inválida',type:'warn'}
        });
    }
}

//Aqui verifica se password é valido, se for poe o 'Valid Password' TRUE e se não for, coloca 'Valid Password' FALSE
export  const handlePasswordChange = (val,data,setData) => {
    if( val.trim().length < 6 && data.password.length < val.trim().length && data.warnPassMessage.type !== 'none') {
        console.log('object')
        setData({
            ...data,
            password: val.trim(),
        });
    } else if( val.trim().length >= 6) {
        setData({
            ...data,
            password: val.trim(),
            warnConfirmMessage: (data.confirmPassword === val.trim()) ? {title:'',body:'Senha válida',type:'check'} : {title:'',body:'As senha devem ser iguais.',type:'none'},
            warnPassMessage: {title:'',body:'Senha válida',type:'check'}
        });
    } else {
        setData({
            ...data,
            password: val.trim(),
            warnPassMessage: {title:'',body:'Senha deve conter no mínimo 6 dígitos',type:'warn'},
            warnConfirmMessage: {title:'',body:'',type:'none'}
        });
    }
}

export const confirmHandlePasswordChange = (val,data,setData) => {
    if( val.trim().length < data.password.length && data.confirmPassword.length < val.trim().length && data.warnConfirmMessage.type === 'none' ) {
        setData({
            ...data,
            confirmPassword: val.trim(),
            warnConfirmMessage: {title:'',body:'Senha deve conter no mínimo 6 dígitos',type:'warn'}
        });
    } else if( data.password === val && data.warnPassMessage.type === 'check') {
        setData({
            ...data,
            confirmPassword: val.trim(),
            warnConfirmMessage: {title:'',body:'Senha válida',type:'check'}
        });
    } else {
        setData({
            ...data,
            confirmPassword: val.trim(),
            warnConfirmMessage: {title:'',body:'As senhas devem ser iguais',type:'warn'}
        });
    }
}
