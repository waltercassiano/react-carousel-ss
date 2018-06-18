import React from "react";
import Carousel from "../src/carousel.js";
import { mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findIndex } from "lodash";

configure({ adapter: new Adapter() });

test("Render Component with default props", () => {
  const component = render(<Carousel />);
  expect(component).toMatchSnapshot();
});

test("Render Component with prev and next active", () => {
  const component = render(<Carousel prev={true} next={true} />);
  expect(component).toMatchSnapshot();
});

test("Render Component with prev and click on prev", () => {
  const component = mount(
    <Carousel prev={true} next={true}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Carousel>
  );
  
  const currentIndex = component.find("Carousel").getElements()[0].props.activeSlide;
  
  component.find(".rcss-prev").simulate("click");

  const nextIndex = component.find("Carousel").getElements()[0].props.activeSlide;
  
  expect(nextIndex).toBe(currentIndex - nextIndex);
});

test("Render Component with next and click on next", () => {
  const component = mount(
    <Carousel prev={true} next={true}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Carousel>
  );
  const currentIndex = component.find("Carousel").getElements()[0].props.activeSlide;
  
  component.find(".rcss-next").simulate("click");

  const nextIndex = component.find("Carousel").getElements()[0].props.activeSlide;
  
  expect(nextIndex).toBe(currentIndex + nextIndex);
});
