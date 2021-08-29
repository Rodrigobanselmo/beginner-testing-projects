import { createStackNavigator } from 'react-navigation-stack';

import StarterIntro from '../screens/Inicio/StarterIntro';
import Gradiente from './GradienteNav/GradienteTab'
import Modal from '../screens/Modal/ModalScreen'
import Calendar from '../screens/Calendar/CalendarScreen'

export default createStackNavigator({
    StarterIntro,
    Gradiente,
    Modal,
    Calendar
});