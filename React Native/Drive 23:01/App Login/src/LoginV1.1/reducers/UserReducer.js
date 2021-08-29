const initialState = {
        name:null,
        givenName:null,
        familyName:null,
        providerId:null,
        email:null,
        emailVerified:null,
        photoURL:null,
        userId:null,
}

export default (state = initialState, action) => {



    switch(action.type) {

        case 'LOGOUT_USER':

        return {...initialState};

        case 'LOGIN_USER':
            var _user =  {};
            _user = {...action.payload}
        return {..._user};

        case 'CHANGE_USER':

        return {...state , ...action.payload };

        default:
            return state;
    }
}


