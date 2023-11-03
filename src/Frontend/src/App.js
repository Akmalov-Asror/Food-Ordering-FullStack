import './App.css';
import Login from './Components/Login&Register&Admin/Login';
import { NavLink, Outlet } from 'react-router-dom';
import SiteBar from './Components/SiteBar/SiteBar';

function App() {
  return (
    <div className="App">
      <SiteBar/>
      <Outlet/>
    </div>
  );
}

export default App;
