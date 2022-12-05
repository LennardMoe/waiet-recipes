import "./App.css";
import Pages from "./pages/Pages";
import Category from "./components/Category";

import { BrowserRouter, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <div className='app'>
        <BrowserRouter>
          <Navbar />
          <div className='content'>
            <Category />
            <Pages />
          </div>

          <Footer />
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;
