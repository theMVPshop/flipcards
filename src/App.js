import NavbarHeader from './Components/NavbarHeader';
import './App.css';
import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Dashboard from './Components/Dashboard';
import EditCard from './Components/EditCard';
import CreateCards from './Components/CreateCards'


function App() {
  return (
    <div className="App">
      <NavbarHeader />
      <Login />
      {/* <Dashboard /> */}
      {/* <EditCard /> */}
      {/* <CreateCards /> */}
    </div>
  );
}

export default App;
