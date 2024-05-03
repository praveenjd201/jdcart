import "./App.css";
import Home from "./components/Home";
import Footer from "./components/layouts/Footer";
import Header from "./components/layouts/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

function App() {
  return (
    <div className="App">
      <HelmetProvider>
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </Router>
        <Footer />
      </HelmetProvider>
    </div>
  );
}

export default App;
