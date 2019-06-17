import React from "react";
import ReactDOM from "react-dom";
import Carousel from "./lib/carousel";
import randomcolor from "randomcolor";

const slideItens = randomcolor({
  count: 10
});

ReactDOM.render(
  <Carousel
    prev={true}
    next={true}
    showItemsNumber={3}
    prevElement={<button style={{ color: "red" }}>prev</button>}
    nextElement={<button>next</button>}
    transition={"all 0.5s linear"}
  >
    {slideItens.map((color, index) => (
      <div key={index} style={{ backgroundColor: color }}>
        {index}
      </div>
    ))}
  </Carousel>,
  document.getElementById("root")
);
