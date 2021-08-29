import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { AuthProvider } from "../src/context/AuthContext"
import {Home} from './pages'
import NotificationProvider from "./context/NotificationContext";
import LoaderProvider from './context/LoaderContext'
import {RouteComponent,home,auth} from './routes'
import { ThemeProvider } from 'styled-components';
import { createMuiTheme, ThemeProvider as MuiThemeProvider} from '@material-ui/core/styles';
import { handleEmailChange } from './components/Initial/Sign/valid';
import {GetCA} from './services/handleCA'
import {GetCNPJ} from './services/handleCNPJ'
/* import axios from 'axios'; */

/* import {NodeSendInviteEmail} from './services/nodeCalls' */

export function App() {

/*   React.useEffect(() => {
    axios.get(`http://localhost:3000/api/cnpj/34553223000106`)
    .then(response => console.log(response.data))
    .catch(error => console.log(error))
  }, []) */

  const theme = createMuiTheme({
    typography:{
      fontFamily:"'Roboto','Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'"
    },
    xyzIndex:{
      richTooltip:1500
    },
    border: {
      width:{
        xs:1,
        s:1.5,
        m:2,
      }
    },
    palette:{
      type:'dark',
      primary:{
        main:'#d9560b',
        contrastText:'#fff',
      },
      secondary:{
        main:'#990000',
      },
      background: {
        paper:'#1a1a1e',
        paperModal:'#1b1c21',
        default:'#0C0C0D',
        contrast:'#26262A',
        iconsPaper:'#A8A8B3',
        inactive:'#A8A8B388',
        line:'#A8A8B319',
        hoverPaper:'rgba(0, 0, 0, 0.3)',
        hoverPaperLighter:'rgba(0, 0, 0, 0.1)',
        paperHighlight:'#d9560b12',
        attention:'#bb2011',
        attentionHover:'#aa2000',
      },
      text:{
        contrastWhite:'#fff',
        strong:'#f4f5f9',
        primary:'#D7D7D9',
        secondary:'#A8A8A3',
        secondaryLighter:'#ddd',
        third:'#D7D7D944',
        hover:'#fff',
        disabled: 'rgba(0, 0, 0, 0.38)',
        hint: 'rgba(0, 0, 0, 0.38)',
        placeholder:'#626262',
        divider:'#ff0000',
      },
      drawer:{
        arrowOpen:'#d9560b',
        listTitle:'#D7D7D9',
        textListSelected:'#D7D7D9',
        textListInactive:'#A8A8B388',
        circleSelected:'#d9560b77',
        textSubListInactive:'#A8A8B388',
        textSubListSelected:'#D7D7D9',
        textSubListActive:'#D7D7D9',
        hoverSubListOpen:'#1f100278',
        backgroundListOpen:'#0C0C0D',
        backgroundSubSubListOpen:'#1a0e02',

/*         backgroundListOpen:'#0C0C0D',
        backgroundSubSubListOpen:'#151519', */

        hoverSubSubListOpen:'#1a0e0277',
/*         hoverSubSubListOpen:'#000', */

        subSubListActive:'#000',
/*         subSubListActive:'transparent', */
      },
      status:{
        success:'#5cb85c',
        fail:'#bb2011',
        warn:'#cfd220',
        info:'#5bc0de',
        successD:'#1fb913',
        failD:'#880000',
        warnD:'#b59c0e',
        infoD:'#4e91d4',
        orange:'#F37735',
      }
    }
  });

  return (
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route {...home}>
              <Home />
            </Route>
            <NotificationProvider>
              <LoaderProvider>  
                <AuthProvider>
                  <Switch>  
                    {auth.map((route, i) => (
                      <RouteComponent key={i} {...route} />
                    ))}
                  </Switch>
                </AuthProvider>
              </LoaderProvider>
            </NotificationProvider>
          </Switch>  
        </Router>
      </ThemeProvider>
    </MuiThemeProvider>
  );
}