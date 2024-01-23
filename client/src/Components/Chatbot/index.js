import { useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget-react-18';
import logo from '../../Assests/icon.png';
import 'react-chat-widget-react-18/lib/styles.css';
import './index.css'

const Chatbot = () => {
    const handleNewUserMessage = (newMessage) => {
        console.log(`New message incoming! ${newMessage}`);
    };
    return (
        <div>
            <Widget
                title='Synoptic Chatbot'
                subtitle=''
                showCloseButton={true}
                emojis={false}
                profileAvatar={logo}
                handleNewUserMessage={handleNewUserMessage} />
        </div>
    );
}

export default Chatbot;