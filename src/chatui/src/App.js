import React from 'react';
import Chat from './Chat';
import Login from './Login';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import CssBaseline from '@material-ui/core/CssBaseline';
import { Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';


const styles = (theme) => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexGrow: '1'
  },
  container: {
    [theme.breakpoints.down('sm')]: {
      padding: 0,
    },
  },
  app: {
    textAlign: "center",
    width: "100%",
    display: "flex",
    height: "100vh",
    flexDirection: "column"
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.state = { 
      user:  {
        name: 'guest'
      }
    };
  }

  handleUserChange(user) {
    this.setState({ user: user });
  }

  render() {
    const { classes } = this.props;
    return (
      <Router>
        <Container maxWidth="sm" className={classes.container}>
          <Paper elevation={3} className={classes.paper}>
            <CssBaseline />
            <Box className={classes.app}>
              <Switch>
                <Route path="/login">
                  <Login onUserChange={this.handleUserChange} user={this.state.user} />
                </Route>
                <Route path="/chat">
                  <Chat user={this.state.user}/>
                </Route>
                <Route path="/">
                  <Login onUserChange={this.handleUserChange} user={this.state.user} />
                </Route>
              </Switch>
            </Box>
          </Paper>
        </Container>               
      </Router>
    );
  }
  
}

export default withStyles(styles)(App);
