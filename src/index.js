import React from "react";
import ReactDOM from "react-dom";
import Carousel from "./lib/carousel";

ReactDOM.render(
  <Carousel
    prev={true}
    next={true}
    showItemsNumber={1}
    prevElement={<button>prev</button>}
    nextElement={<button>next</button>}
    >
    <div>1</div>
    <div>2</div>
    <div>3</div>
    <div>3</div>
    <div>3</div>
    <div>3</div>
    <div>3</div>
    <div>3</div>
    <div>3</div>
    <div>3</div>
  </Carousel>,
  document.getElementById("root")
);
