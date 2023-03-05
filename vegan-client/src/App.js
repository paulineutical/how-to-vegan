import './App.css';
import { Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import HomePage from "./pages/HomePage";

import SignupPage from "./pages/SignupPage"; 
import LoginPage from "./pages/LoginPage";
import AddRecipe from "./pages/AddRecipe";
import RecipeList from './pages/RecipeList';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>      
        <Route path="/" element={ <HomePage /> } />
        <Route path="/signup" element={ <SignupPage /> } />
        <Route path="/login" element={ <LoginPage /> } />
        <Route path="/recipes" element={ <RecipeList /> } />
        <Route path="/add-recipe" element={ <AddRecipe /> } />

        {/* <Route path="/add-recipe" element={ <AddRecipe /> } /> */}

      </Routes>
    </div>
  );
}

export default App;
