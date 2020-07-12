import React from 'react';
import Message from './Message';
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Backdrop from '@material-ui/core/Backdrop';
import MuiAlert from '@material-ui/lab/Alert';

const styles = (theme) => ({
    form: {
      padding: theme.spacing(0,2),
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'baseline',
      background: '#d5dade'
    },
    submit: {
        margin: theme.spacing(2, 0),
    },
    messages: {
        padding: theme.spacing(0, 2),
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        overflow: 'auto'
    },
    input: {
        backgroundColor: 'white'
    },
    chat: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        maxHeight: "100vh"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
  });

class Chat extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            messages: [],
            newMessage: '',
            error: false,
            isMessageLoading: false
        };
    }
    
    async componentDidMount() {
        try {
            const response = await fetch('http://localhost:8080/messages/');
            const body = await response.json();
            this.setState({ messages: body, isLoading: false });
            
        } catch (error) {
            console.error('Error connecting to server: ' + error);
            this.setState({ error: true, isLoading: false });
        }
    }

    handleSubmit = async (event) => {     
        event.preventDefault();        
    }
    
    handleChange = (event) => {
        this.setState({ 
            ...this.state,
            newMessage: event.target.value            
        });
    }

    render() {
        const {messages, newMessage, isLoading} = this.state;
        const {classes} = this.props;
    
        if (isLoading) {
          return <CircularProgress color="inherit" />;
        }
    
        return (
          <Box className={classes.chat}>
            <Box className={classes.messages}>
                {messages.map(message =>
                    <Message 
                        key={message.id} 
                        author={message.author} 
                        text={message.text}
                        created={message.created}
                        my={message.author === this.props.user.name} />
                )}
                <div style={{ float:"left", clear: "both" }}
                    ref={(el) => { this.messagesEnd = el; }}>
                </div>
            </Box>            
            <ValidatorForm
                className={classes.form}
                onSubmit={this.handleSubmit}
                onError={errors => console.log(errors)}>
                <TextValidator
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    id="message"
                    name="message"
                    validators={['required']}
                    errorMessages={['Text is required']}
                    autoFocus
                    value={newMessage}
                    onChange={this.handleChange}
                    className={classes.inputContainer}
                    inputProps={{
                        className: classes.input,
                        maxLength: 255
                    }}
                />
                <Button
                    className={classes.submit}
                    type="submit"
                >
                    Send
                </Button>
            </ValidatorForm>
            <Backdrop 
                className={classes.backdrop} 
                open={this.state.error}>
                <MuiAlert
                    elevation={6} 
                    variant="filled"
                    severity="error">
                    Error contacting server! Try again later.
                </MuiAlert>
            </Backdrop>
          </Box>
        );
      }
}

export default withStyles(styles)(Chat);