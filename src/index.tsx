import React, { FC } from "react";
import ReactDOM from "react-dom";
import img from "./images/test.jpg";
import "./styles.scss";

const App: FC = () => {
  const env = process.env.NODE_ENV;
  return ( 
    <>
      <div>Hello {env} world</div>
      <img src={img} alt="" />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'));