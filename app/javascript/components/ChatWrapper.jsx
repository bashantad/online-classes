import React from 'react';
import PropTypes from 'prop-types';
import { ActionCableProvider } from 'react-actioncable-provider';

import Chat  from './Chat';
import { API_WS_ROOT } from '../constants';

const ChatWrapper = ({open, handleClose}) => (
	<ActionCableProvider url={API_WS_ROOT}>
    	<Chat open={open} handleClose={handleClose}/>
  	</ActionCableProvider>
);

ChatWrapper.propTypes = {
	open: PropTypes.bool.isRequired,
	handleClose: PropTypes.func.isRequired
};

export default ChatWrapper;
