import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Bio from '../../assets/risks/biological-hazard.svg';
//import Bio from '../../assets/risks/biohazard.svg';
import Qui from '../../assets/risks/test-tube.svg';
import Fis from '../../assets/risks/fire.svg';
import Erg from '../../assets/risks/passenger.svg';
import Aci from '../../assets/risks/accident.svg';
//import Aci from '../../assets/risks/wounded.svg';
import Exp from '../../assets/risks/explosivo.svg';
import Inf from '../../assets/risks/gasoline.svg';
import Rad from '../../assets/risks/radiactive.svg';
import Guard from '../../assets/risks/guard (1).svg';
import Ele from '../../assets/risks/energy.svg';
import Mot from '../../assets/risks/motocicleta.svg';

export default function Icons({name,...props}) {
    switch (name) {

        case 'Close':
            return <AntDesign name={'close'} {...props} />
        case 'CloseCircle':
            return <AntDesign name={'closecircleo'} {...props} />
        case 'Config':
            return <AntDesign name={'setting'} {...props} />
        case 'Board':
            return <MaterialCommunityIcons name={'clipboard-check-outline'} {...props} />
        case 'Edit':
            return <AntDesign name={'edit'} {...props} />
        case 'Check':
            return <Ionicons name={'ios-checkmark-circle-outline'} {...props} />
        case 'Warn':
            return <AntDesign name={'warning'} {...props} />
        case 'UserEmail':
            return <FontAwesome name={'user-o'} {...props} />
        case 'User':
            return <FontAwesome name={'user-circle'} {...props} />
        case 'Lock':
            return <Ionicons name={'lock-closed-outline'} {...props} />
        case 'SecureOn':
            return <Ionicons name={'ios-eye-off-outline'} {...props} />
        case 'SecureVisible':
            return <Ionicons name={'ios-eye-outline'} {...props} />
        case 'Menu':
            return <Ionicons name={'ios-menu'} {...props} />
        case 'ArrowLeft':
            return <Ionicons name={'chevron-back'} {...props} />
        case 'ArrowRight':
            return <Ionicons name={'chevron-forward'} {...props} />
        case 'ArrowBack':
            return <Ionicons name={'arrow-back'} {...props} />
        case 'Apps':
            return <Ionicons name={'apps'} {...props} />
        case 'Camera':
            return <Ionicons name={'ios-camera-outline'} {...props} /> //ios-camera
        case 'Doc':
            return <Ionicons name={'document-text-outline'} {...props} />
        case 'Fingerprint':
            return <Ionicons name={'finger-print-outline'} {...props} />
        case 'Plus':
            return <AntDesign name={'plus'} {...props} />
        case 'MinusStroke':
            return <AntDesign name={'minus'} {...props} />
        case 'PlusStroke':
            return <AntDesign name={'plus'} {...props} />
        case 'Question':
            return <Ionicons name={'help-circle-outline'} {...props} />
        case 'QuestionFill':
            return <Ionicons name={'help-circle'} {...props} />
        case 'Info':
            return <Ionicons name={'information-circle-outline'} {...props} />
        case 'Exclamation':
            return <Ionicons name={'alert-circle-outline'} {...props} />
        case 'Help':
            return <Ionicons name={'ios-help-circle-outline'} {...props} />
        case 'Image':
            return <Ionicons name={'md-image-outline'} {...props} />
        case 'NoImages':
            return <MaterialCommunityIcons name={'image-off-outline'} {...props} />
        case 'Upload':
            return <MaterialCommunityIcons name={'upload'} {...props} />
        case 'UploadFail':
            return <MaterialCommunityIcons name={'upload-off-outline'} {...props} />
        case 'Trash':
            return <Ionicons name={'ios-trash-outline'} {...props} />
        case 'DoubleCheck':
            return <Ionicons name={'ios-checkmark-done'} {...props} />
        case 'Search':
            return <Ionicons name={'search'} {...props} />


        case 'fis':
            return <Fis width={25} height={25} {...props} />
        case 'qui':
            return <Qui width={25} height={25} {...props} />
        case 'bio':
            return <Bio width={25} height={25} {...props} />
        case 'erg':
            return <Erg width={25} height={25} {...props} />
        case 'aci':
            return <Aci width={25} height={25} {...props} />
        case 'EXPLOSIVOS':
            return <Exp width={25} height={25} {...props} />
        case 'INFLAMÁVEIS':
            return <Fis width={27} height={27} {...props} />
        case 'RADIAÇÕES IONIZANTES':
            return <Rad width={27} height={27} {...props} />
        case 'MOTOCICLETA':
            return <Mot width={27} height={27} {...props} />
        case 'ELETRICIDADE':
            return <Ele width={30} height={30} {...props} />
        case 'VIGILÂNCIA':
            return <Guard width={27} height={27} {...props} />

/*         case 'Load':
            return (
            <div {...props}>
                <LottieAnimation  lotti='loader' height={30} width={30} isClickToPauseDisabled={true} />
            </div>
            ) */
        default:
            return <AntDesign name={'close'} {...props} />
    }
}
