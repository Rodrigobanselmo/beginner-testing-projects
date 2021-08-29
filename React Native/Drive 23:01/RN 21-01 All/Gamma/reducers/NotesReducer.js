/* 
const initialStatePasta = {pasta:[{list:[], title: 'Faculdade', tasks:['#292929'], colors:["#eee", "#fff", "#292929"], image: 'university', imageBack: '#00bb00', } ]}

const initialStateList = {list:[ {title: 'Terminar APP', body: '', done: false, tempoestimado: '12h', para: '26/09/2020', progress: 0.0, progressColor:'#000', backgroundColor:'#292929'} ]} 

 */

const initialState = {pasta:[
    {"arquivado": false, "edit": true, "id": 0.07693692276971298, "image": "laptop-code", "imageBack": "#2980b9", "list": [
        {"backgroundColor": ["#E6BF49", "#8C6B06"], "body": "", "date": '2020-10-30T02:59:00.000Z', "finalizada": true, "id": 0.9099445748857613, "nunSub": 3, "ordem": 50, "para": '2020-10-15T02:59:00.000Z', "pausada": false, "progress": 0, "progressColor": "#DE9903", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "3"}, {"backgroundColor": ["#5C9557", "#2A4F27"], "body": "", "date": '2020-10-30T02:59:00.000Z', "finalizada": true, "id": 0.5207371423789706, "nunSub": 3, "ordem": 75, "para": '2021-01-31T02:59:00.000Z', "pausada": false, "progress": 0, "progressColor": "#118010", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "2"}, {"backgroundColor": ["#2471A3", "#154360"], "body": "", "date": '2020-10-30T02:59:00.000Z', "finalizada": true, "id": 0.9604545095442968, "nunSub": 3, "ordem": 100, "para": "Sem data prevista", "pausada": false, "progress": 0, "progressColor": "#2956E0", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "1"}, {"backgroundColor": ["#EE433D", "#7C0000"], "body": "", "date": '2020-10-30T02:59:00.000Z', "finalizada": true, "id": 0.8001125447883473, "nunSub": 3, "ordem": 25, "para": "Sem data prevista", "pausada": false, "progress": 0, "progressColor": "#D60813", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "4"}
    ], "ordem": "5", "title": "React Native "},
    {"arquivado": false, "edit": true, "id": 0.10189409643370906, "image": "graduation-cap", "imageBack": "#f39c12", "list": [], "ordem": "5", "title": "Faculdade "}, 
    {"arquivado": false, "id": 0.2951513038556135, "image": "hands-helping", "imageBack": "#16a085", "list": [], "ordem": "5", "title": "Comercial "}, 
    {"arquivado": false, "id": 0.026160795247935353, "image": "font", "imageBack": "#ff0272", "list": [], "ordem": "5", "title": "Vida Pessoal"}
], theme: 0}


export default (state = initialState, action) => {



    switch(action.type) {

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
            console.log(newPast)

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



/*          case 'ADD_NOTES':
            newPast.push({
                title: action.payload.title,
                body: action.payload.body
            });
        break; */





/* 
        const initialState = {list:[ {title: 'primeira nota', body: 'testando 1,2,3...'} ] } ;


const Nomedacoisa = (state = initialState, action) => {

    let newList = [...state.list]

    switch(action.type) {
        case 'ADD_NOTE':
            newList.push({
                title: action.payload.title,
                body: action.payload.body
            })

            return ( state );

        case 'EDIT_NOTE':
            if(newList[action.payload.key]) {
                newList[action.payload.key] = {
                    title: action.payload.title,
                    body: action.payload.body
                };
            }

            return ( state );

        case 'DEL_NOTE':
            newList = newList.filter((item,index)=>index != action.payload.key);

            return ( state);

        default:
            return state;
    }
};

export default Nomedacoisa; */