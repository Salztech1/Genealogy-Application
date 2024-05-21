import './App.css';
import FamilyTree from './Component/FamilyTree';
import SignUpForm from './Component/signup';
import LogInForm from './Component/login';
import AddMember from './Component/AddMember'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<FamilyTree />} />
          <Route path="/login" element={<LogInForm />} className='bg-primary' />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/add-member" element={<AddMember />} />
          
        </Routes>
      </Router>
    </div>
  );
}

export default App;
