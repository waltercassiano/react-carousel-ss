import React from "react";
import Carousel from "../src/carousel.js";
import renderer from "react-test-renderer";
import { findIndex } from "lodash";

test("Render Component with default props", () => {
  const component = renderer.create(<Carousel />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Render Component with prev and next active", () => {
  const component = renderer.create(<Carousel prev={true} next={true} />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test("Render Component with prev and click on prev", () => {
  const component = renderer.create(<Carousel prev={true} next={true} />);
  const tree = component.toJSON();
  const prev = findIndex(tree.children, (child) => { return child.props.id === "rcss-prev"});
  tree.children[prev].props.onClick();
  expect(tree).toMatchSnapshot();
});

test("Render Component with next and click on next", () => {
  const component = renderer.create(<Carousel prev={true} next={true} />);
  const tree = component.toJSON();
  const next = findIndex(tree.children, (child) => { return child.props.id === "rcss-next"});
  tree.children[next].props.onClick();
  expect(tree).toMatchSnapshot();
});
