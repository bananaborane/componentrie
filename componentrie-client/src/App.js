import React from 'react';
// import logo from './logo.svg';
import './App.css';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import createMuiTheme from '@material-ui/core/styles/createMuiTheme'
import { BrowerRouter as Router, Route, Switch } from 'react-router-dom'

//Components
import Navbar from './components/Navbar'

// Pages
import home from './pages/home'
import login from './pages/login'
import signup from './pages/signup'

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#82e9de',
      main: '#4db6ac',
      dark: '#00867d',
      contrastText: '#fff'
    },
    secondary: {
      light: '#82e9de',
      main: '#4db6ac',
      dark: '#00867d',
      contrastText: '#fff'
    }

  },
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: 'center'
  },
  pageTitle: {
      margin: '10px auto 10px auto'
  },
  textField: {
      margin: '10px auto 10px auto'
  },
  button: {
      marginTop: 20,
      position: 'relative'
  },
  customError: {
      color: 'red',
      fontSize: '0.8rem',
      marginTop: 10
  },
  progress: {
      position: 'absolute'
  }
})

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route path="/login" component={login} />
              <Route path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
