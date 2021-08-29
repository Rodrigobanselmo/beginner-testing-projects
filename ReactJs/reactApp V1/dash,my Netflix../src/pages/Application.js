import React from 'react';
import { createMuiTheme, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import NavSystem from '../components/App/NavSystem';

function Application() {

  const theme = createMuiTheme({
    typography:{
      fontFamily:"'Encode Sans Expanded','Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif'"
    },
    palette:{
      primary:{
        light:'#eee',
        main:'#d9560b',
        dark:'#262626',
        contrastText:'#fff',
      },
      background: {
        paper:'#262626',
        default:'#454'
      },
      text:{
        primary:'#fff',
        secondary:'green'
      }
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <NavSystem>

      </NavSystem>
    </ThemeProvider>
  );
}

export default Application;
