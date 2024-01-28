import { useState, useEffect } from 'react';
import { Widget, addResponseMessage, toggleMsgLoader, setQuickButtons, addLinkSnippet, addUserMessage } from 'react-chat-widget-react-18';
import logo from '../../Assests/icon.png';
import 'react-chat-widget-react-18/lib/styles.css';
import './index.css'
import { catchErrors, CHATBOT_API_URL, POST_REQUEST_OPTIONS } from '../../Utils';

const Chatbot = () => {
    const [resp, setResp] = useState(0);
    const [submitStatus, setSubmitStatus] = useState(true);
    const [recommend, setRecommend] = useState(0);
    const [recommendTitle, setRecommendTitle] = useState(0);
    const [recommendId, setRecommendId] = useState(0);

    setQuickButtons([
        {
            label: 'I would like to find similar products with RADIANT ROSE WRAP DRESS...',
            value: 'Please recommend one similar product with RADIANT ROSE WRAP DRESS. Give me the product title name, and tell me why'
        },
    ]);

    const handleNewSubmit = (newSubmit) => {
        const dirtyWords = /(fuck|shit|crap|asshole)/i;
        if (dirtyWords.test(newSubmit)) {
            addResponseMessage('In Synoptic bot, we do not allow foul languages. Please be polite, thank you!');
            setSubmitStatus(false);
            return false;
        }
        return true;
    };

    const handleNewUserMessage = (newMessage) => {
        if (submitStatus) {
            toggleMsgLoader();
            setTimeout(() => {
                toggleMsgLoader(); // needs to be in settimeout
                setResp(newMessage);
                console.log(`New message incoming! ${newMessage}`);
            }, 7000)
        }
    };

    const handleQuickButtonClicked = (e) => {
        toggleMsgLoader();
        setTimeout(() => {
            addUserMessage(e)
            setResp(e);
            toggleMsgLoader(); // needs to be in settimeout
            console.log(`New message incoming! ${e}`);
        }, 10000)
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
                setRecommendTitle(resObject.title)
                setRecommendId(resObject.id);
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
            if (recommendTitle && recommendId){
                addLinkSnippet({link: `${process.env.REACT_APP_SYNOPTIC_URL}/product/${recommendId}`, title: recommendTitle});
            }
        } else {
            console.log("Response is not resolved yet.");
        }
        return () => {
            setRecommend(0);
            setRecommendTitle(0);
        };
    }, [recommend])


    return (
        <div>
            <Widget
                title='Recommendation Bot'
                subtitle='Find the best in Synoptic with some advice!'
                showCloseButton={true}
                profileAvatar={logo}
                handleNewUserMessage={handleNewUserMessage}
                handleSubmit={handleNewSubmit}
                handleQuickButtonClicked={handleQuickButtonClicked}
            />
        </div>
    );
}

export default Chatbot;