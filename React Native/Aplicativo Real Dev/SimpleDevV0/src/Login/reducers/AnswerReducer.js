const initialState = {}


export default (state = initialState, action) => {



    switch(action.type) {
        case 'CREATE_CHECKLIST':
            console.log('object')
        return {...action.payload};

        case 'ANSWER':
            console.log('objecdddt')
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            if (list.data[groupId].questions[itemId].selected === action.payload.peek) {
                list.data[groupId].questions[itemId].selected = ''
            } else {
                list.data[groupId].questions[itemId].selected = action.payload.peek
            }
        return {...list};

        case 'ANSWER_OBS':
            var list = {...state}
            var groupId = list.data.findIndex((i)=>i?.id && i.id===action.payload.groupId)
            var itemId = list.data[groupId].questions.findIndex((i)=>i?.id && i.id===action.payload.itemId)
            console.log('itemId',itemId)
            console.log('groupId',groupId)
            //if (!list.data[groupId].questions[itemId]?.obs || (list.data[groupId].questions[itemId]?.obs && list.data[groupId].questions[itemId].obs!== action.payload.value)) {
                list.data[groupId].questions[itemId].obs = action.payload.value
            //}
        return {...list};

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