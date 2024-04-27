import './App.css';
import Header from "./components/header/Header";
import {Route, Routes} from "react-router-dom";
import ListCard from "./components/main/ListCard";
import AddUnit from "./components/header/AddUnit";
import Basket from "./components/header/Basket";

function App() {
  return (
  <>
    <header>
      <Header/>
    </header>
    <main>
      <Routes>
        <Route path="*" element={<ListCard/>}/>
        <Route path="/add" element={<AddUnit/>}/>
        <Route path="/basket" element={<Basket/>}/>
      </Routes>
    </main>
  </>
  );
}

export default App;
