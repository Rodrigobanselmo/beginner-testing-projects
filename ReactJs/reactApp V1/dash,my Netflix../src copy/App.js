import React from 'react';
import './App.css';
/* import styled from "styled-components"; */

/* const Master = styled.div`
  display: flex;
  background-color: #000;
  flex-direction: column;
  align-items: center;
  width: 100vw;
  height: 100vh;

`;


const View = styled.div`
  height: 30px;
  width: 100px;
  background: red;
`;
const View2 = styled.div`
  height: 100px;
  width: 100px;
  background: green;
`;
const ViewContainer = styled.div`
display:flex;
flex-direction:column;
flex-basis:100;
flex-grow:3;
  background: blue;
  justify-content:space-around;
  align-items:center;



`;
const ViewContainer3 = styled.div`
flex-grow:1;
  

`;

const ViewContainer2 = styled.div`
  background: #262626;
  flex-grow:1;
`;
 */
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import SigninPage from './pages/signin';

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' component={Home} exact />
        <Route path='/signin' component={SigninPage} exact />
      </Switch>
    </Router>
  );
}

export default App;

/* 
function App() {
  return (
    <Master >
      <ViewContainer3>
      </ViewContainer3>
      <ViewContainer>
        <View/>
        <View/>
        <View/>
        <View/>
      </ViewContainer>
      <ViewContainer2>
      <View2/>
      </ViewContainer2>
    </Master>
  )
}

export default App */
