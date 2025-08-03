import './Sidebar.css';
import { assets } from '../../assets/assets.js';
import { useState, useContext } from 'react';
import { Context } from "../../Context/Context.jsx";

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts = [], setRecentPrompt, newChat, loadPrompt } = useContext(Context) || {};

    return (
        <div className='Sidebar'>
            <div className='top'>
                <img
                    onClick={() => setExtended(prev => !prev)}
                    src={assets.menu_icon}
                    alt='menu'
                    className='menu'
                />
                <div onClick={() => newChat()} className='new-chat'>
                    <img
                        src={assets.plus_icon}
                        alt='new chat'
                        className='new-chat-icon'
                    />
                    {extended && <p>New Chat</p>}
                </div>
                {extended && (
                    <div className='recent'>
                        <p className='recent-title'>Recent</p>
                        {prevPrompts.map((item, index) => (
                            <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                                <img src={assets.message_icon} alt="message" />
                                <p>{item.slice(0, 18)}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className='bottom'>
                <div className='bottom-item recent-entry'>
                    <img src={assets.question_icon} alt='help' />
                    {extended && <p>Help</p>}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.history_icon} alt='history' />
                    {extended && <p>History</p>}
                </div>
                <div className='bottom-item recent-entry'>
                    <img src={assets.setting_icon} alt='settings' />
                    {extended && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
};

export default Sidebar;