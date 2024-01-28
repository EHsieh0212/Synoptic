import { useState, useEffect } from 'react';
import { Widget, addResponseMessage } from 'react-chat-widget-react-18';
import logo from '../../Assests/icon.png';
import 'react-chat-widget-react-18/lib/styles.css';
import './index.css'
import { catchErrors, CHATBOT_API_URL, POST_REQUEST_OPTIONS } from '../../Utils';

const Chatbot = () => {
    const [resp, setResp] = useState(0);
    const [recommend, setRecommend] = useState(0);

    const handleNewUserMessage = (newMessage) => {
        setResp(newMessage);
        console.log(`New message incoming! ${newMessage}`);
    };


    useEffect(() => {
        const fetchData = async () => {
            if (resp !== 0) {
                const gettingChatgptResp = catchErrors(async (resp) => {
                    const result = await fetch(`${CHATBOT_API_URL}/chatroomRecommend`, POST_REQUEST_OPTIONS(JSON.stringify({ customerReq: resp })));
                    if (!result.ok) {
                        const error = await result.json();
                        console.error("Cannot retrieve data error:", error);
                        return;
                    }
                    const res = await result.json();
                    return res; // returning a complete object
                });
                // if we want to await this func, we must wrap up the whole thing with "fetchData" and then we can await gettingChatgptResp
                const resObject = await gettingChatgptResp(resp); // use await to wait for object to resolve
                setRecommend(resObject.response);
            }
        };
        fetchData();
        return () => {
            setResp(0);
        };
    }, [resp]);


    useEffect(() => {
        if (recommend) {
            addResponseMessage(`${recommend}`);
        } else {
            console.log("Response is not resolved yet.");
        }
        return () => {
            setRecommend(0);
        };
    }, [recommend])


    return (
        <div>
            <Widget
                title='Recommendation Bot'
                subtitle='Find the best in Synoptic with some advice!'
                showCloseButton={true}
                profileAvatar={logo}
                handleNewUserMessage={handleNewUserMessage} />
        </div>
    );
}

export default Chatbot;