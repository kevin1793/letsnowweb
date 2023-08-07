import logo from './assets/logo-64.png';
import './App.css';
import Sidebar from './components/sidebar';
import Main from './components/main';

function App() {
  return (
    <div className='appWrapper'>

      <div className='wrapper'>
        <Sidebar/>
        <Main/>
        {/* RightSide */}
      </div>
    </div>
  );
}

export default App;
