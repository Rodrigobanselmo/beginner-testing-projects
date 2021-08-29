const initialState = {user:null}


export default (state = initialState, action) => {



    switch(action.type) {

        case 'LOGOUT_USER':
            var logout_user = '';
            console.log(logout_user)

        return {...state , user: logout_user};

        case 'ADD_USER':
            var add_user =  action.payload;
/*             console.log('ADD USER')
            console.log(add_user) */
        return {...state , user: add_user };

        default:
            return state;
    }
}


