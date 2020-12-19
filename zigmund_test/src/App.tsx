import React from "react";
import "./App.sass";
import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar } from "react-bootstrap";
import Search from "./containers/Search/Search";
import Repositories from "./containers/Repositories/Repositories";
import ErrorModal from "./containers/ErrorModal/ErrorModal";

const App: React.FC = () => {
  return (
    <>
      <header>
        <Navbar bg="dark" variant="dark">
          <div className="container">
            <a href="/" className="navbar-brand name-program">
              GitHub Finder
            </a>
          </div>
        </Navbar>
      </header>
      <main className="container">
        <Search />
        <Repositories />
        <ErrorModal />
      </main>
    </>
  );
};

export default App;
