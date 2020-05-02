import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Group from '@material-ui/icons/Group';
import Icon from '@material-ui/core/Icon';

import './Chat.css';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: 0,
  },
}))(MuiDialogContent);

const Chat = ({open, handleClose}) => {
  const peopleInTheChat = [
    'John Smith',
    'Bashanta Dahal',
    'Josh Aresty',
    'Prashant Khadka',
    'Brad Larsen',
    'Martin Patel',
    'George Regan',
    'Alex Kutcher'
  ];
  return (
    <div>      
      <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
        <DialogTitle id="customized-dialog-title" onClose={handleClose}>
          Computer science classroom
        </DialogTitle>       
        <DialogContent dividers>
          <Grid container spacing={1}>
            <Grid item xs={4}>
                <ul className='people-list'>
                  <li className='conversation-person'>
                    <Group /> <span>Classroom</span>
                  </li>
                  <li className='conversation-person'>
                    <Group /> <span>My group</span>
                  </li>                  
                  {
                    peopleInTheChat.map((person, index) =>
                      <li className='conversation-person' key={`person-${index}`}>
                        <AccountCircleIcon /> <span> {person} </span>
                      </li>
                    )
                  }
                </ul>            
            </Grid>
            <Grid item xs={8}>
              <div className='message-wrapper'>
                <div className='conversation-item'>
                  <div className='person'>
                    <span> <AccountCircleIcon /> Bashanta Dahal</span> 
                  </div>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </div>

                <div className='conversation-item'>
                  <div className='person'>
                    <span><AccountCircleIcon /> Josh Aresty</span>
                  </div>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
                </div>
                <div className='conversation-item'>
                  <div className='person'>
                    <span> <AccountCircleIcon /> Ryan Larsen</span> 
                  </div>
                  Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
                </div>
                <div className='conversation-item'>
                  <div className='person'>
                    <span> <AccountCircleIcon /> Bashanta Dahal</span> 
                  </div>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                </div>

                <div className='conversation-item'>
                  <div className='person'>
                    <span><AccountCircleIcon /> Brad Larsen</span>
                  </div>
                  Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
                </div>
                <div className='conversation-item'>
                  <div className='person'>
                    <span> <AccountCircleIcon /> Martin Patel</span> 
                  </div>
                  Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
                </div>              
              </div>
              <div className='message-box'>
                <textarea className='message-input' placeholder='Type your message'></textarea>
                <Button variant="contained" color="primary">
                  Send
                </Button>
              </div>
            </Grid>
          </Grid>          
        </DialogContent>      
      </Dialog>
    </div>
  );
};

export default Chat;
