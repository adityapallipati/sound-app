import { BrowserRouter, Routes, Route } from "react-router-dom";
import SoundNav from "./SoundNav";
import Home from "./Home";
import Wireframe from "./Wireframe";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/wireframe" element={<Wireframe />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
