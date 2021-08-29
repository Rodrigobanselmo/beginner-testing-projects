
const initialState = [{groupID: '123',messages:[], lastUpdate:0, membros:[]}]

export default (state = initialState, action) => {

    switch(action.type) {

        case 'DELETE_ALL':
            
        return [{groupID: '123',messages:[], lastUpdate:0, membros:[]},{groupID: '1243',messages:[], lastUpdate:0},{groupID: '1253',messages:[], lastUpdate:0}];

        case 'ADD_MESSEGE':
            var msg = [...state]
            var sub = {groupID: '123', lastUpdate:action.payload.lastUpdate, messages:action.payload.userReaload, membros:[]}
            msg = msg.filter(i=>i.groupID!='123');
        return [sub,...msg];

        case 'ADD_MEMBER':
            var msg = [...state]
            var msg2 = {}
            msg2 = msg.filter(i=>i.groupID=='123');
            msg = msg.filter(i=>i.groupID!='123');
            var sub = {...msg2[0], membros:action.payload}
        return [sub,...msg];

        default:
            return state;
    }
}
