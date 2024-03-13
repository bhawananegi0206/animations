import './App.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from "./navBar";
import Home from "./pages/home";
import ThreeExample from "./pages/threeExample";
import HouseDetails from "./pages/houseDetail";
import RoomDesign from "./pages/roomDesign";
import Box from "./pages/box";
import MoveChair from "./pages/chair";

function App() {
  return (
    <Router>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/threeExample" element={<ThreeExample />} />
                <Route path="/roomDesign" element={<RoomDesign />} />
                <Route
                    path="/houseDetails"
                    element={<HouseDetails />}
                />
                 <Route 
                    path="/box"
                    element={<Box />}
                />
                <Route
                    path="/chair"
                    element={<MoveChair />}
                />
            </Routes>
        </Router>

   
  );
}

export default App;
