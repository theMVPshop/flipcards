import NavbarHeader from './Components/NavbarHeader';
import './App.css';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard';
import EditCard from './Components/EditCard';
import CreateCards from './Components/CreateCards';
import PasswordReset from './Components/UpdateProfile'


function App() {
  return (
    <div className="App">
      {/* <NavbarHeader />
      <Login /> */}
      <PasswordReset />
      {/* <Dashboard /> */}
      {/* <EditCard /> */}
      {/* <CreateCards /> */}
    </div>
  );
}

export default App;
