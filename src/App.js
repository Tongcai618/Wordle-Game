import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Game from "./pages/Game";
import Login from "./pages/Login"
import Signup from "./pages/Signup";
import { TokenProvider } from "./context/tokenContext";

function App() {
    const authenticated = false;
    return (
        <BrowserRouter>
            <TokenProvider>
                <Routes>
                    <Route path="/" element={<Game />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} /> 
                    <Route path="/game" element={<Game />} />
                </Routes>
            </TokenProvider>
        </BrowserRouter>
    );
}

export default App;
