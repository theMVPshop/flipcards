import NavbarHeader from './Components/NavbarHeader';
import './App.css';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard';
import EditCard from './Components/EditCard';
import CreateCards from './Components/CreateCards';
import UpdateProfile from './Components/UpdateProfile';
import ResetPassword from './Components/ResetPassword'


function App() {
  return (
    <div className="App">
      <NavbarHeader />
       {/* <Login />  */}
      {/* <UpdateProfile /> */}
      {/* <Dashboard /> */}
      {/* <EditCard /> */}
      {/* <CreateCards /> */}
      <ResetPassword />
    </div>
  );
}

export default App;
