import Sidebar from './component/Sidebar/Sidebar.jsx'
import MainComponent from './component/Main/MainComponent.jsx'
import './App.css'
const App = () => {
  return (
    <>
      <div className='app-container'>
        <Sidebar />
        <MainComponent />
      </div>
    </>
  )
}

export default App
