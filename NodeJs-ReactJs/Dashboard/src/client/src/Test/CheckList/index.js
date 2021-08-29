import React, {useState,useEffect} from 'react'
import Container,{MainComponent} from './comp'
import Header from '../../components/Dashboard/Components/Blocks/Header'
import {useLoaderScreen} from '../../context/LoaderContext'
import {useNotification} from '../../context/NotificationContext'
import {useAuth} from '../../context/AuthContext'
import { useLocation } from 'react-router-dom';

function Companies() {

  const [open, setOpen] = useState(false)
  const [queryOld, setQueryOld] = useState(false)
  const [rowsCells, setRowsCells] = useState([])
  const [selected, setSelected] = useState([]);

  const {setLoad} = useLoaderScreen();
  const {currentUser} = useAuth()
  const notification = useNotification()

  const tabsLabel = ['Checklist']

    return (
        <>
            <Header icons={'Checklist'} title={'Gerenciar Checklists'} video={true}/>
            <Container >
            <MainComponent
                setRowsCells={setRowsCells}
                rowsCells={rowsCells}
                tabsLabel={tabsLabel}
                notification={notification}
                currentUser={currentUser}
                setOpen={setOpen}
                tabsLabel={tabsLabel}
                selected={selected}
                setSelected={setSelected}
                setLoad={setLoad}
              />
            </Container>
        </>
    )
}

export default Companies
