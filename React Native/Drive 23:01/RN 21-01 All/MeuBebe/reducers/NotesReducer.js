/* 
const initialStatePasta = {pasta:[{list:[], title: 'Faculdade', tasks:['#292929'], colors:["#eee", "#fff", "#292929"], image: 'university', imageBack: '#00bb00', } ]}

const initialStateList = {list:[ {title: 'Terminar APP', body: '', done: false, tempoestimado: '12h', para: '26/09/2020', progress: 0.0, progressColor:'#000', backgroundColor:'#292929'} ]} 

 */

const initialState = {pasta:[{list: [], title: 'Faculdade', image: 'university', imageBack: '#1020ac', ordem: 800, arquivado: false, id: 'A' },
                                     {list: [{"backgroundColor": "#FEBD03", "body": "", "date": '2020-10-12T02:59:00.000Z', "id": 0.8707308773904648, "key": 3, "nunSub": 3, "ordem": 50, "para": "Sem data prevista", "progress": 0, "progressColor": "#DE9903", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "Y"},{"backgroundColor": "#FEBD03", "body": "", "date": '2020-10-12T02:59:00.000Z', "id": 0.8707308773904611, "key": 3, "nunSub": 3, "ordem": 50, "para": "Sem data prevista", "progress": NaN, "progressColor": "#DE9903", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "Y"}], title: 'Atletismo', image: 'medal', imageBack: '#c0392b', ordem: 4, arquivado: false,id: 'B' },
                                     {list: [], title: 'Atividades', image: 'anchor', imageBack: '#d35400', ordem: 5, arquivado: false,id: 'C' },
                                     {list: [{"backgroundColor": "#ff5049", "body": "", "date": '2020-10-13T02:59:00.000Z', "id": 0.463050295147964913, "nunSub": 3, "ordem": 25, "para": "Sem data prevista", "progress": 0, "progressColor": "#D60813", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "Teste 1"},{"backgroundColor": "#ff5049", "body": "", "date": '2020-10-13T02:59:00.000Z', "id": 0.463054029517964913, "nunSub": 3, "ordem": 25, "para": "Sem data prevista", "progress": 0, "progressColor": "#D60813", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "Teste 1"},{"backgroundColor": "#ff5049", "body": "", "date": '2020-10-13T02:59:00.000Z', "id": 0.463050295179649513, "nunSub": 3, "ordem": 25, "para": "Sem data prevista", "progress": 0, "progressColor": "#D60813", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "Teste 1"},{"backgroundColor": "#ff5049", "body": "", "date": '2020-10-13T02:59:00.000Z', "id": 0.456305029517964913, "nunSub": 3, "ordem": 25, "para": "Sem data prevista", "progress": 0, "progressColor": "#D60813", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "Teste 1"},{"backgroundColor": "#ff5049", "body": "", "date": '2020-10-13T02:59:00.000Z', "id": 0.463050295617964913, "nunSub": 3, "ordem": 25, "para": "Sem data prevista", "progress": 0, "progressColor": "#D60813", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "Teste 1"},{"backgroundColor": "#ff5049", "body": "", "date": '2020-10-13T02:59:00.000Z', "id": 0.4630502951796477913, "nunSub": 3, "ordem": 25, "para": "Sem data prevista", "progress": 0, "progressColor": "#D60813", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "Teste 1"},{"backgroundColor": "#ff5049", "body": "", "date": '2020-10-13T02:59:00.000Z', "id": 0.4630502951796784913, "nunSub": 3, "ordem": 25, "para": "Sem data prevista", "progress": 0, "progressColor": "#D60813", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "Teste 1"},{"backgroundColor": "#ff5049", "body": "", "date": '2020-10-13T02:59:00.000Z', "id": 0.463050295197964913, "nunSub": 3, "ordem": 25, "para": "Sem data prevista", "progress": 0, "progressColor": "#D60813", "subCheck": 0, "subtarefas": [], "tempoestimado": "12h", "title": "Teste 1"}], title: 'laptop-code', image: 'laptop-code', imageBack: '#00bb00', ordem: 16, arquivado: false,id: 'D' },      
                                     {ordem: 1000000}, 
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