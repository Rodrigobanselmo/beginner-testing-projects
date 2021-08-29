const initialState = {
    position:'',
    parent:{},
}


export default (state = initialState, action) => {



    switch(action.type) {

        case 'CREATE_RISK_ANSWER_POSITION':
        return {...action.payload};

        case 'ADD_RISK_ANSWER_POSITION':
            var actualState = {...state}
            actualState.position = {...action.payload}
            if (action.payload?.peek && action.payload.action[action.payload.peek]?.child && !action.payload?.parent && !action.payload?.per) actualState.parent = {...actualState.parent,[action.payload.action[action.payload.peek].child]:[{questionId:action.payload.id,groupId:action.payload.groupId,selected:action.payload.peek}]}
            try {
                if (action.payload?.peek && action.payload.action[action.payload.peek]?.child && action.payload?.parent && !action.payload?.per) actualState.parent = {...actualState.parent,[action.payload.action[action.payload.peek].child]:[...actualState.parent[action.payload.id],{questionId:action.payload.id,groupId:action.payload.groupId,selected:action.payload.peek}]}//[...actualState.parent.filter(i=>i!=action.payload.id),action.payload.id]
            } catch {
                if (action.payload?.peek && action.payload.action[action.payload.peek]?.child && action.payload?.parent && !action.payload?.per) actualState.parent = {[action.payload.action[action.payload.peek].child]:[{questionId:action.payload.id,groupId:action.payload.groupId,selected:action.payload.peek}]}//[...actualState.parent.filter(i=>i!=action.payload.id),action.payload.id]
            }
            return {...actualState};

        case 'LOGOUT_RISK_POSITION':
        return {...initialState};

        default:
        return state;
    }
}



/*             action.payload?.data && action.payload.data.map((group)=>{
                let GROUP = {id:item.id, response:[]}
                group?.questions && group.questions.map((question)=>{
                    GROUP.push({})
                })
            }) */
