import React from "react";
import { VFXProvider, VFXDiv } from "react-vfx";
import customShader from "./glsl/sample01";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <VFXProvider>
          {customShader && (
            <VFXDiv style={{width: 1000, height: 1000, backgroundColor: "white"}} shader={customShader} />
          )}
        </VFXProvider>
      </header>
    </div>
  );
};

export default App;
