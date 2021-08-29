import {useState} from 'react';

const useFade = (inicial) => {

    const [fade, seFade] = useState(true);
    const [change, seChange] = useState(inicial);

    function fadeInOut(action,next) {
        if (fade === true) {
            action()
            seFade(false)
            setTimeout(() => {
            seChange(next)
            seFade(true)
            }, 650);
        }
    }

    return [fade,change,fadeInOut]
}

export default useFade