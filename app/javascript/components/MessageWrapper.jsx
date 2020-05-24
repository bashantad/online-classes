import React from 'react';
import { ActionCableProvider } from 'react-actioncable-provider';

import Message  from './Message';
import { API_WS_ROOT } from '../constants';

const MessageWrapper = () => (
	<ActionCableProvider url={API_WS_ROOT}>
    	<Message />
  	</ActionCableProvider>
);

export default MessageWrapper;
