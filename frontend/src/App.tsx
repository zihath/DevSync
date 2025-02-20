import Home from "./pages/Home";
import Profile from "./pages/Profile";
import DashBoard from "./pages/DashBoard";
import FileDetails from "./pages/FileDetails";
import CreateFile from "./pages/CreateFile";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Using the alias

function App() {
  return (
    <div>
        <Router>
          <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/DashBoard" element={<DashBoard/>}></Route>
          <Route path="/CreateFile" element={<CreateFile />} />
          <Route path="/file/:fileId" element={<FileDetails/>}></Route>
          </Routes>
        </Router>
    </div>
  );
}

export default App;
