import React from "react";
import Carousel from "../src/carousel.js";
import renderer from 'react-test-renderer';

test("Render Component", () => {
  const component = renderer.create(
    <Carousel item="teste"/>
  );

  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});
