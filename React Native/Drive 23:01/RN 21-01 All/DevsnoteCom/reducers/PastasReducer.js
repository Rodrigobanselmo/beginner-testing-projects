const initialState = {
    pasta:[
        {title: 'primeira pasta', body: 'testando 1,2,3...'}
    ]
};

export default (state = initialState, action) => {
    let newList =  [...state.pasta] ;


    switch(action.type) {
        case 'ADD_NOTE1':
            newList.push({
                title: action.payload.title,
                body: action.payload.body
            });
        break;
        case 'EDIT_NOTE1':
            if(newList[action.payload.key]) {
                newList[action.payload.key] = {
                    title: action.payload.title,
                    body: action.payload.body
                };
            }
        break;
        case 'DEL_NOTE1':
            newList = newList.filter((item,index)=>index != action.payload.key);
        break;
    }

    return {...state, pasta: newList};
}