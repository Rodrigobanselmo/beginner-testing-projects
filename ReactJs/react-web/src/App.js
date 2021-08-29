import React, {useState} from 'react'
import './App.css'
import useModal from './Modal'

const App = () => {

    //modal
    const [text, setText] = useState('')
    const [items, setItems] = useState([])
    const [Modal, setShowModal] = useModal()

    function handleChange(e) {
        setText(e.target.value);
    }

    function addItem(e) {
        e.preventDefault();
        setItems([...items,text]);
        setText('')
        console.log('object');
    }


    return (
        <div >
            <form>
                <input onChange={handleChange} value={text} type="text"/>
                <button onClick={addItem}>{text}</button>
                <div onClick={()=>setShowModal(true)}>modal</div>
            </form>
            <ul>
                {items.map(item=>{
                    return<li>{item}</li>
                })}
            </ul>
            <Modal><div className="card"></div></Modal>
        </div>
    )
}

export default App
