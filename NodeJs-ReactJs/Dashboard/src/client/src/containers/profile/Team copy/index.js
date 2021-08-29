import React, {useState,useEffect} from 'react'
import TableMembers from './TableOld'
import Modal from './Modal'
import Header from '../../../components/Dashboard/Components/Blocks/Header'
import {useNotification} from '../../../context/NotificationContext'
import {useAuth} from '../../../context/AuthContext'
import { useLocation } from 'react-router-dom';
import {useLoaderDashboard} from '../../../context/LoadDashContext'
import {Container} from './comp'

function Team() {

  const [open, setOpen] = useState(false)
  const [queryOld, setQueryOld] = useState(false)
  const [usersRows, setUsersRows] = useState([])
  const [selected, setSelected] = useState([]);

  const {currentUser} = useAuth()
  const notification = useNotification()
  const query = new URLSearchParams(useLocation().search)
  const { setLoaderDash } = useLoaderDashboard();

  useEffect(() => {
    if (query.get('m') !== queryOld && query.get('m')) setOpen(true); setQueryOld(query.get('m'))
  }, [query])

    return (
        <>
            <Header icons={'Admin'} title={'Gerenciamento de Usuários'} video={true}/>
            <Container >
                <TableMembers
                  setLoaderDash={setLoaderDash}
                  currentUser={currentUser}
                  notification={notification}
                  setUsersRows={setUsersRows}
                  usersRows={usersRows}
                  setOpen={setOpen}
                />
            </Container>
            <Modal setUsersRows={setUsersRows} open={open} setOpen={setOpen}/>
        </>
    )
}

export default Team
