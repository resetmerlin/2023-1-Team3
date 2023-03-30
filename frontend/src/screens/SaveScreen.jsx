import React from "react";
import Footer from "../components/Footer";
import SaveList from "../components/SaveList";
const SaveScreen = () => {
  return (
    <section className="save">
      <span className="save__title">Your save list</span>

      <SaveList />
      <Footer />
    </section>
  );
};

export default SaveScreen;
