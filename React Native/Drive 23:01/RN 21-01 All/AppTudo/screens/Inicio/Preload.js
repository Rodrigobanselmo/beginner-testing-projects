import { StackActions, NavigationActions } from 'react-navigation';
import { connect } from 'react-redux';

const Preload = (props) => { ///como estamos usando isso, noa podemos usar os Hook useRout e Connect pq esta no stacknav algo assim, entao temos que usar o outroo jeito


        props.navigation.dispatch(StackActions.reset({
            index:0,
            actions:[
                NavigationActions.navigate({routeName:'StarterStack'})
            ]
        }));
        return null;
}

const mapStateToProps = (state) => {
    return {
        name:state.userReducer.name
    };
}
export default connect(mapStateToProps)(Preload);