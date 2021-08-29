import History from '@material-ui/icons/History';
import CloudDownload from '@material-ui/icons/CloudDownload';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Person from '@material-ui/icons/Person';
import Group from '@material-ui/icons/Group';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Search from '@material-ui/icons/Search';
import Add from '@material-ui/icons/Add';
import Cancel from '@material-ui/icons/Cancel';
import Close from '@material-ui/icons/Close';
import HighlightOff from '@material-ui/icons/HighlightOff';
import VideoLibrary from '@material-ui/icons/VideoLibrary';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import SettingsIcon from '@material-ui/icons/Settings';
import RecordVoiceOverIcon from '@material-ui/icons/RecordVoiceOver';
import Build from '@material-ui/icons/Build';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Mail from '@material-ui/icons/Mail';
import Notifications from '@material-ui/icons/Notifications';
import Help from '@material-ui/icons/Help';
import Error from '@material-ui/icons/Error';
import RestorePage from '@material-ui/icons/RestorePage';
import Storage from '@material-ui/icons/StorageTwoTone';
import Business from '@material-ui/icons/BusinessTwoTone';
import Apps from '@material-ui/icons/Apps';
import { AiOutlineClose } from 'react-icons/ai';
import { BsCheckCircle,BsExclamationTriangle,BsXOctagon,BsInfoCircle } from 'react-icons/bs';
import LottieAnimation from '../../lib/lottie'

export function Icons({type,...props}) {
    switch (type) {


        case 'Check':
            return <BsCheckCircle {...props} />
        case 'Warn':
            return <BsExclamationTriangle {...props} />
        case 'Error':
            return <BsXOctagon {...props} />
        case 'Info':
            return <BsInfoCircle {...props} />

        case 'Administrative':
            return <FileCopyIcon {...props} />
        case 'RH':
            return <RecordVoiceOverIcon {...props} />
        case 'Technician':
            return <Build {...props} />
        case 'Engineer':
            return <SettingsIcon {...props} />
        case 'Admin':
            return <SupervisorAccountIcon {...props} />
            
        case 'Storage':
            return <Storage {...props} />
        case 'Business':
            return <Business {...props} />
        case 'Apps':
            return <Apps {...props} />


        case 'History':
            return <History {...props} />
        case 'CloudDownload':
            return <CloudDownload {...props} />
        case 'ExitToApp':
            return <ExitToApp {...props} />
        case 'Group':
            return <Group {...props} />
        case 'Person':
            return <Person {...props} />
        case 'KeyboardArrowRightIcon':
            return <KeyboardArrowRightIcon {...props} />
        case 'KeyboardArrowDownIcon':
            return <KeyboardArrowDownIcon {...props} />
        case 'Add':
            return <Add {...props} />
        case 'Search':
            return <Search {...props} />
        case 'Cancel':
            return <Cancel {...props} />
        case 'Close':
            return <Close {...props} />
        case 'HighlightOff':
            return <HighlightOff {...props} />
        case 'ArrowBack':
            return <ArrowBack {...props} />
        case 'Notifications':
            return <Notifications {...props} />
        case 'Mail':
            return <Mail {...props} />
        case 'RestorePage':
            return <RestorePage {...props} />

        case 'Errors':
            return <Error {...props} />
        case 'Help':
            return <Help {...props} />
        case 'Video':
            return <VideoLibrary {...props} />

        case 'Load':
            return (
            <div {...props}>
                <LottieAnimation  lotti='loader' height={30} width={30} isClickToPauseDisabled={true} />
            </div>
            )
        default:
            return <Close {...props} />
    }
}