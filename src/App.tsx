import React from "react";
import SeminarList from "./components/SeminarList";

const App: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Seminar List</h1>
      <SeminarList />
    </div>
  );
};

export default App;
