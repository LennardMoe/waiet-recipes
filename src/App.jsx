import "./App.css";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import { BrowserRouter, useLocation } from "react-router-dom";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import NewRecipe from "./components/NewRecipe";

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Category />
        <Pages />
      </BrowserRouter>
    </div>
  );
}

export default App;
