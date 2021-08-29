import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import AuthRoutes from './Auth/AuthStack';
import AppRoutes from './Dashboard/MainStack';

// import { useAuth } from '../hooks/auth';

export function Routes() {
	// const { user } = useAuth();
	return(
		<NavigationContainer>
			<AuthRoutes/>
      <Toast ref={(ref) => Toast.setRef(ref)} />
		</NavigationContainer>
	)
}
// {false ? <AppRoutes /> : <AuthRoutes/>}
