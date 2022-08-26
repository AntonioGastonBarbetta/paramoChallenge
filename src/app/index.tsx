import React from "react";
import Footer from "../components/footer";
import Header from "../components/header";
import Navigation from "../routes";
import "./index.scss";

const App = () => {
  return (
    <>
      <Header />
      <main className="main">
        <Navigation />
      </main>
      <Footer />
    </>
  );
};

export default App;
