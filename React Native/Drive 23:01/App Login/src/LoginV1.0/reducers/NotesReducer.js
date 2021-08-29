const initialState = {user:null}


export default (state = initialState, action) => {



    switch(action.type) {

        case 'ADD_LIST':
            var newList = [...state.pasta] ;
            newList.push(
                { id: action.payload.id, title: action.payload.title, body: action.payload.body, date: action.payload.date, tempoestimado: action.payload.tempoestimado, para: action.payload.para, progress: action.payload.progress, progressColor:action.payload.progressColor, backgroundColor:action.payload.backgroundColor, ordem:action.payload.ordem, subtarefas:action.payload.subtarefas, nunSub:action.payload.nunSub, subCheck:action.payload.subCheck, finalizada:action.payload.finalizada, pausada: action.payload.pausada}
            );

        return {...state , pasta: newPasta };

        case 'DELETE_PASTA2':
            var newPast = [...state.pasta] ;
            newPast  = newPast.filter((item)=> item !== 0);
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


