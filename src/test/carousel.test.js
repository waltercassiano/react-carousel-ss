import React from "react";
import Carousel from "../lib/carousel.js";
import { mount, render, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { times } from "lodash";

configure({ adapter: new Adapter() });

test("Render Component - default props", () => {
  const component = render(<Carousel />);
  expect(component).toMatchSnapshot();
});

test("Render Component - prev and next active", () => {
  const component = render(<Carousel prev={true} next={true} />);
  expect(component).toMatchSnapshot();
});

test("Render Component - prev and click on prev", () => {
  const component = mount(
    <Carousel prev={true} next={true}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Carousel>
  );

  const currentIndex = component.find("Carousel").getElements()[0].props
    .activeSlide;

  component.find(".rcss-prev").simulate("click");

  const nextIndex = component.find("Carousel").getElements()[0].props
    .activeSlide;

  expect(nextIndex).toBe(currentIndex - nextIndex);
});

test("Render Component - next and click on next", () => {
  const component = mount(
    <Carousel prev={true} next={true}>
      <div>1</div>
      <div>2</div>
      <div>3</div>
    </Carousel>
  );
  const currentIndex = component.find("Carousel").getElements()[0].props
    .activeSlide;

  component.find(".rcss-next").simulate("click");

  const nextIndex = component.find("Carousel").getElements()[0].props
    .activeSlide;

  expect(nextIndex).toBe(currentIndex + nextIndex);
});

test("Render Component - go to last slide then return to the first", () => {
  const component = mount(
    <Carousel prev={true} next={true}>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
      <div>slide</div>
    </Carousel>
  );

  // Go to Last Slide
  const numberSlide =
    component.find("Carousel").getElements()[0].props.numberSlide - 1;

  times(numberSlide, () => {
    component.find(".rcss-next").simulate("click");
  });

  const activeSlideNext = component.find("Carousel").getElements()[0].props
    .activeSlide;
  expect(activeSlideNext).toBe(numberSlide);

  // Return to first Slide
  times(numberSlide, () => {
    component.find(".rcss-prev").simulate("click");
  });

  const activeSlidePrev = component.find("Carousel").getElements()[0].props
    .activeSlide;

  expect(activeSlidePrev).toBe(0);
});

const visibleItems = 1;
test(
  "Render Component - default visible items equal to " + visibleItems,
  () => {
    const component = mount(
      <Carousel prev={true} next={true} showItemsNumber={visibleItems}>
        <div>1</div>
        <div>2</div>
        <div>3</div>
      </Carousel>
    );
    const showItemsNumber = component.find("Carousel").getElements()[0].props
      .showItemsNumber;
    expect(visibleItems).toBe(showItemsNumber);
  }
);
