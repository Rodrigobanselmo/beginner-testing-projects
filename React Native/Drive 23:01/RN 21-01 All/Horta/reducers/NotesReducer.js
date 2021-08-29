const fotos = ['https://static.boredpanda.com/blog/wp-content/uploads/2018/12/ai-image-generation-fake-faces-people-nvidia-5c18b207b7231__700.jpg','https://static.boredpanda.com/blog/wp-content/uploads/2018/12/ai-image-generation-fake-faces-people-nvidia-5c18b209749ac__700.jpg','https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-7.jpg','https://www.headshotsprague.com/wp-content/uploads/2019/07/Headshots_Prague-emotional-portrait-of-a-smiling-entrepreneur-1.jpg']
const nomes = ['José Oliveira','Maria Garcia','Gilbert da Silva','Juliana Marinho']
const initialState = {user: [ {id:0,avatar:fotos[0], name:nomes[0], location:1, vendedor: {isOne:true, stars:4.9, vendas:4} },
                             {id:1,avatar:fotos[1], name:nomes[1], location:1.5, vendedor: {isOne:true, stars:4.5, vendas:1} },
                             {id:2,avatar:fotos[2], name:nomes[2], location:6.1, vendedor: {isOne:true, stars:4.2, vendas:2} },
                             {id:3,avatar:fotos[3], name:nomes[3], location:7.3, vendedor: {isOne:true, stars:4.7, vendas:3} },
]}


export default (state = initialState, action) => {



    switch(action.type) {

        case 'ADD_VENDEDOR':
            var newList = action.payload;

        return {...state , theme: newList };

        case 'ADD_USER':
            var newList = action.payload;

        return {...state , theme: newList };












        case 'CHANGE_THEME':
            var newList = action.payload;

        return {...state , theme: newList };

        case 'ADD_LIST':
            var newList = [...state.pasta[action.payload.key].list] ;
            newList.push(
                { id: action.payload.id, title: action.payload.title, body: action.payload.body, date: action.payload.date, tempoestimado: action.payload.tempoestimado, para: action.payload.para, progress: action.payload.progress, progressColor:action.payload.progressColor, backgroundColor:action.payload.backgroundColor, ordem:action.payload.ordem, subtarefas:action.payload.subtarefas, nunSub:action.payload.nunSub, subCheck:action.payload.subCheck, finalizada:action.payload.finalizada, pausada: action.payload.pausada}
            );
            
            var newPasta = [...state.pasta];
            newPasta[action.payload.key].list = newList 

            console.log(newList)

        return {...state , pasta: newPasta };

        case 'NAOFEITA_LISTA':
            var newPast = [...state.pasta];
            
            newPast[action.payload.key].list[action.payload.index].finalizada = false

        return {...state , pasta: newPast };


/*         case 'NAOFEITA_LISTA':
            var newPast = [...state.pasta];
            var indexAtual = 0

            function isList(list) { 
                return list.id == action.payload.id;
            }

            indexAtual = newPast[action.payload.key].list.findIndex(isList)

            if (newPast[action.payload.key].list[indexAtual].id == action.payload.id) {
            newPast[action.payload.key].list[indexAtual].finalizada = false
            }

        return {...state , pasta: newPast }; */

        case 'COMCLUIR_LISTA':
            var newPast = [...state.pasta];
/*             newPast[action.payload.key].list.splice(indexAtual, 1); */
                newPast[action.payload.key].list[action.payload.index].progress = 1


        return {...state , pasta: newPast };

        case 'PAUDASA_LISTA':
            var newPast = [...state.pasta];

            newPast[action.payload.key].list[action.payload.index].pausada = true
            newPast[action.payload.key].list[action.payload.index].para = action.payload.horas

            
        return {...state , pasta: newPast };

/*         case 'PAUDASA_LISTA':
            var newPast = [...state.pasta];
            var indexAtual = 0

            function isListe(list) { 
                return list.id == action.payload.id;
            }

            indexAtual = newPast[action.payload.key].list.findIndex(isListe)
            if (newPast[action.payload.key].list[indexAtual].id == action.payload.id) {
            newPast[action.payload.key].list[indexAtual].pausada = true
            newPast[action.payload.key].list[indexAtual].para = action.payload.horas
            }
            
        return {...state , pasta: newPast }; */

        case 'DELETAR_LISTA_REAL':
            var newPast = [...state.pasta];
            var newList = newPast[action.payload.key].list
            newList  = newList.filter((item)=> item.id !== action.payload.id);
            newPast[action.payload.key].list = newList


        return {...state , pasta: newPast };




        case 'ADD_PASTA':
            var newPast = [...state.pasta];
            newPast.push(
                {list:[], title: action.payload.title, image: action.payload.image, imageBack: action.payload.imageBack, ordem: '5', arquivado:false, id: action.payload.id }
            );

        return {...state , pasta: newPast };

        case 'ARQUIVAR_PASTA':
            var newPast = [...state.pasta] ;
            console.log(newPast)
            newPast[action.payload].arquivado = true;
            console.log(action.payload)
        return {...state , pasta: newPast };

        case 'DELETE_PASTA':
            var newPast = [...state.pasta] ;
            newPast[action.payload] = 0;
/*             console.log(newPast) */
        return {...state , pasta: newPast };

        case 'DELETE_PASTA2':
            var newPast = [...state.pasta] ;
            newPast  = newPast.filter((item)=> item !== 0);
/*             console.log(newPast) */
        return {...state , pasta: newPast };

        case 'EDIT_PASTA':
            var newPast = [...state.pasta];
            var indexAtual = 0
            function isPasta(past) { 
                return past.id == action.payload.id;
            }
            indexAtual = newPast.findIndex(isPasta)
            newPast[indexAtual] = {...action.payload};

        return {...state , pasta: newPast };

        default:
            return state;
    }
}

