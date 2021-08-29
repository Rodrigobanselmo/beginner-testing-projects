const doc = 21706097000122;
const endpoint = 'https://www.receitaws.com.br/v1/cnpj';

if (doc === '') {
  Alert.alert('Oops!', 'Nenhum documento informado!');
  return false;
}

fetch(`${endpoint}/${doc}`)
  .then(response => {
    return response.json();
  })
  .then(docInfo => {
    
      console.log(docInfo)
  })
  .catch(err => {

    Alert.alert('Oops!', 'Houve um erro inesperado ao realizar a consulta. Pro favor, tente novamente mais tarde!');
    console.log(err);
  });