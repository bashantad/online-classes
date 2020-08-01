import React from 'react';
import { ActionCableConsumer } from 'react-actioncable-provider';

const Cable = ({ conversations, handleReceivedMessage }) => {
	return (
    	<>
      		{
      			conversations.map(conversation => (
          			<ActionCableConsumer
            			key={`${conversation.id}-conversation-id`}
            			channel={{ channel: 'MessageChannel', conversation_id: conversation.id }}
            			onReceived={handleReceivedMessage}
          			/>
          		))
      		}
        </>
  );
};

export default Cable;
