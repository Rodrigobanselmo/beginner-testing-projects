import React, {useState} from 'react'

function useModal() {
        
    const [showModal, setShowModal] = useState(false)


    function hideModal(e) {
        if (e.target.id === 'modal') {
            setShowModal(false)
        }
    }
    function Modal(props) {        
        return (
            <div id="modal" onClick={hideModal} className={ showModal ? "modal" : 'modal hide'} >
                <div>{props.children}</div>
            </div>
        )
    }

    return [Modal,setShowModal]
}

export default useModal