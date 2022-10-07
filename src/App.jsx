import "./App.css";
import Pages from "./pages/Pages";
import Category from "./components/Category";
import CategoryNew from "./components/CategoryNew";
import { BrowserRouter, useLocation } from "react-router-dom";
import Search from "./components/Search";
import Navbar from "./components/Navbar";
import NewRecipe from "./components/NewRecipe";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthContextProvider>
      <div className='App'>
        <BrowserRouter>
          <Navbar />
          <Category />
          <CategoryNew />
          <Pages />
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

export default App;
