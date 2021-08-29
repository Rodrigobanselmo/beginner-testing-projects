export default (muscle) => {
    let muscleImage = null;
    switch(muscle) {
        case 'abs':
            muscleImage = require('../assets/muscles/abs.png');
            break;
        case 'back':
            muscleImage = require('../assets/muscles/back.png');
            break;
        case 'biceps':
            muscleImage = require('../assets/muscles/biceps.png');
            break;
        case 'chest':
            muscleImage = require('../assets/muscles/chest.png');
            break;
        case 'gluteos':
            muscleImage = require('../assets/muscles/gluteos.png');
            break;
        case 'legs':
            muscleImage = require('../assets/muscles/legs.png');
            break;
        case 'shoulders':
            muscleImage = require('../assets/muscles/shoulders.png');
            break;
        case 'triceps':
            muscleImage = require('../assets/muscles/triceps.png');
            break;
        case 'corrida':
            muscleImage = require('../assets/muscles/corrida.png');
            break;
        case 'abss':
            muscleImage = require('../assets/muscles/abss.png');
            break;
        case 'peso':
            muscleImage = require('../assets/muscles/peso.png');
            break;
        case 'altura':
            muscleImage = require('../assets/muscles/altura.png');
            break;
            case 'alongamento':
                muscleImage = require('../assets/muscles/alongamento.png');
                break;
                case 'esteira':
                    muscleImage = require('../assets/muscles/esteira.png');
                    break;
                    case 'long':
                        muscleImage = require('../assets/muscles/long.png');
                        break;
                        case 'barreira':
                            muscleImage = require('../assets/muscles/barreira.png');
                            break;
                            case 'caminhada':
                                muscleImage = require('../assets/muscles/caminhada.png');
                                break;
                                case 'velozes':
                                    muscleImage = require('../assets/muscles/velozes.png');
                                    break;
    }

    return muscleImage;
}