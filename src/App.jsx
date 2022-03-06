import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Sounds from "./Sounds";
import About from "./About";
import Isohedron from "./Isohedron";
import TorusKnot from "./TorusKnot";
import Octohedron from "./Octohedron";
import Wireframe from "./Wireframe";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sounds" element={<Sounds />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/wireframe" element={<Wireframe />}></Route>
        <Route path="/isohedron" element={<Isohedron />}></Route>
        <Route path="/torusknot" element={<TorusKnot />}></Route>
        <Route path="/octohedron" element={<Octohedron />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
