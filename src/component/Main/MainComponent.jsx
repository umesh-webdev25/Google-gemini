import React, { useContext } from 'react'; // Added useContext import
import './MainComponent.css'
import { assets } from '../../assets/assets'
import { Context } from "../../Context/Context";


const MainComponent = () => {
  const { 
    onSent, 
    recentPrompt, 
    showResult, 
    loading, 
    resultData, 
    setInput, 
    input,
    theme,
    toggleTheme 
  } = useContext(Context);

  return (
    <div className='main'>
      <div className='top-right-controls'>
        <button onClick={toggleTheme} className='theme-toggle'>
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
        <div className='profile-container'>
          <img src={assets.user_icon} alt='Profile' className='profile-image' />
        </div>
      </div>
      <div className='main-container'>
        {!showResult ? (
          <>
            <div className='greet'>
              <p><span>Hello, Dev.</span></p>
              <p>How can I help you today?</p>
            </div>
            <div className='cards'>
              <div className='card rule-blink'>
                <span className='card-tag'>Travel</span>
                <p className='card-title'>Travel Planning Assistant</p>
                <p>Suggest beautiful places to see on an upcoming road trip with detailed itineraries and local highlights</p>
                <img src={assets.compass_icon} alt='' />
              </div>
              <div className='card rule-blink'>
                <span className='card-tag'>Knowledge</span>
                <p className='card-title'>Concept Explorer</p>
                <p>Explain complex topics with examples: architecture, science, technology, and more</p>
                <img src={assets.bulb_icon} alt='' />
              </div>
              <div className='card rule-blink'>
                <span className='card-tag'>Business</span>
                <p className='card-title'>Team Building Pro</p>
                <p>Generate creative team activities and ice-breakers for better workplace collaboration</p>
                <img src={assets.message_icon} alt='' />
              </div>
              {/* <div className='card rule-blink'>
                <span className='card-tag'>Coding</span>
                <p className='card-title'>Code Optimizer</p>
                <p>Enhance code quality with best practices and modern syntax improvements</p>
                <img src={assets.code_icon} alt='' />
              </div>
              <div className='card rule-blink'>
                <span className='card-tag'>Writing</span>
                <p className='card-title'>Content Creator</p>
                <p>Generate creative content ideas and improve writing with professional polish</p>
                <img src={assets.message_icon} alt='' />
              </div> */}
              {/* <div className='card rule-blink'>
                <span className='card-tag'>Analysis</span>
                <p className='card-title'>Data Insights</p>
                <p>Analyze data patterns and generate meaningful insights from your information</p>
                <img src={assets.bulb_icon} alt='' />
              </div> */}
            </div>
          </>
        ) : (
          <div className='result'>
            <div className='result-title'>
              <img src={assets.user_icon} alt=''/>
              <p>{recentPrompt}</p>
            </div>
            <div className='result-data'>
              <img src={assets.gemini_icon} alt=''/>
              {loading ? (
                <div className='loader'>
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p dangerouslySetInnerHTML={{__html: resultData}}></p>
              )}
            </div>
          </div>
        )}
        <div className='main-bottom'>
          <div 
            className='search-box'
            onClick={(e) => {
              const inputElement = e.currentTarget.querySelector('input');
              if (inputElement) inputElement.focus();
            }}
          >
            <input 
              value={input} 
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && input.trim()) {
                  e.preventDefault();
                  onSent(input.trim());
                }
              }}
              type='text' 
              placeholder='Enter a prompt here'
              autoFocus
            />
            <div className='search-imge'>
              <img src={assets.gallery_icon} alt=''/>
              <img src={assets.mic_icon} alt=''/>
              <img 
                onClick={() => input.trim() && onSent(input.trim())} 
                src={assets.send_icon} 
                alt='Send'
                style={{ cursor: input.trim() ? 'pointer' : 'not-allowed', opacity: input.trim() ? 1 : 0.5 }}
              />
            </div>
          </div>
          <div className='bottom-info'>
            <p>
              Gemini may display inaccurate info, including about people, so double-check its responses.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainComponent;