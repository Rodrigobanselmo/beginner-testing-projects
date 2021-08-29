
const initialState = {pasta:[{list:[ {title: 'primeira nota', body: ''} ], title: 'primeira pasta' } ]}

/* const initialState = {list:[ {title: 'primeira nota', body: 'testando 1,2,3...'} ] }
 */

export default (state = initialState, action) => {


       var newPast = [...state.pasta] ;


    switch(action.type) {
        case 'ADD_NOTE':
            var newList = [...state.pasta[action.payload.pastakey].list] ;
            newList.push({
                title: action.payload.title,
                body: action.payload.body
            });


            var newPasta = [...state.pasta];
            newPasta[action.payload.pastakey].list = newList 

        return {...state , pasta: newPasta };

        case 'EDIT_NOTE':
            var newList = [...state.pasta[action.payload.pastakey].list] ;
            if(newList[action.payload.key]) {
                newList[action.payload.key] = {
                    title: action.payload.title,
                    body: action.payload.body
                };
            }
            var newPasta = [...state.pasta];
            newPasta[action.payload.pastakey].list = newList 

        return {...state , pasta: newPasta };

        case 'DEL_NOTE':
            var newList = [...state.pasta[action.payload.pastakey].list] ;
            newList = newList.filter((item,index)=>index != action.payload.key);
 
            var newPasta = [...state.pasta];
            newPasta[action.payload.pastakey].list = newList 

        return {...state , pasta: newPasta };
    
        case 'ADD_PASTA':
            newPast.push(
                {list:[ {title: 'primeira nota', body: ''} ], title: action.payload.title }
            );

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