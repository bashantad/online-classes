import React from 'react';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

export default class ConversationList extends React.Component {
  render() {
    return (
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
    );
  }
}
