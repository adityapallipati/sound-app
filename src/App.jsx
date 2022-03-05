import { BrowserRouter, Routes, Route } from "react-router-dom";
import SoundNav from "./SoundNav";
import Home from "./Home";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SoundNav sounds={[]} />}></Route>
        <Route path="/home" element={<Home />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
