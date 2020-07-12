import React from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom'
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

const styles = (theme) => ({
    container: {
      margin: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  });
  
  class Login extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = {
          formData: {
              name: props.user.name,
          }
        };
    }
  
    handleSubmit = (event) => {     
      event.preventDefault();
      this.props.onUserChange({
          name: this.state.formData.name
      });   
      this.props.history.push('/chat');
    }
  
    handleChange = (event) => {     
      const { formData } = this.state;
      formData[event.target.name] = event.target.value;
      this.setState({ formData });
    }
  
    render() {
      const { classes } = this.props;
      const { formData } = this.state;
      return (
          <Box maxWidth="xs" className={classes.container}>
              <Typography component="h1" variant="h5">
              Sign in
              </Typography>
              <ValidatorForm 
                  className={classes.form}
                  onSubmit={this.handleSubmit}
                  onError={errors => console.log(errors)}>
                  <TextValidator
                      variant="outlined"
                      margin="normal"
                      fullWidth
                      id="name"
                      label="User name"
                      name="name"
                      autoComplete="user"
                      validators={['required']}
                      errorMessages={['Name is required']}
                      autoFocus
                      value={formData.name}
                      onChange={this.handleChange}
                      inputProps={{ maxLength: 25 }}
                  />
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                  >
                      Start chatting
                  </Button>
              </ValidatorForm>
          </Box>
        );
    }  
  }
  
  Login.propTypes = {
      classes: PropTypes.object.isRequired,
  };
    
  export default withRouter(withStyles(styles)(Login));