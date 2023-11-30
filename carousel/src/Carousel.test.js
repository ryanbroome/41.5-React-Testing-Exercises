import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import photos from "./photos.js";
import TEST_IMAGES from "./_testCommon.js";

//? Smoke test for Carousel, got it to work but not sure if this syntax is correct
it("renders the carousel without error", function () {
  const carouselTitle = "Test Title";
  render(<Carousel photos={TEST_IMAGES} title={carouselTitle} />);
});

// ? Snapshot test for Carousel
it("snapshot <Carousel/> test", function () {
  const { asFragment } = render(<Carousel photos={TEST_IMAGES} title={"test title"} />);
  expect(asFragment()).toMatchSnapshot();
});

// ? Specialized test right arrow functionality
it("works when you click on the right arrow", function () {
  const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  // expect the first image to show, but not the second
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();
});

// ? Specialized test left arrow functionality
it("works when you click on the left arrow", function () {
  const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  // expect the first image to show, but not the second
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = container.querySelector(".bi-arrow-right-circle");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(container.querySelector('img[alt="testing image 1"]')).not.toBeInTheDocument();
  expect(container.querySelector('img[alt="testing image 2"]')).toBeInTheDocument();

  // move backward in the carousel
  const leftArrow = container.querySelector(".bi-arrow-left-circle");
  fireEvent.click(leftArrow);

  // expect the first image to show but not the second
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
});

// ? Specialized test left arrow null on first image
it("left arrow missing on first carousel image", function () {
  const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  // expect the first image to show, and no left arrow
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector(".bi bi-arrow-left-circle")).not.toBeInTheDocument();
});

// ? Specialized test right arrow null on last image
it("right arrow missing on last carousel image", function () {
  // render element, capture render object
  const { container } = render(<Carousel photos={TEST_IMAGES} title="images for testing" />);
  // expect the first image to show, and no left arrow
  expect(container.querySelector('img[alt="testing image 1"]')).toBeInTheDocument();
  expect(container.querySelector(".bi-arrow-left-circle")).not.toBeInTheDocument();

  // click button enough times to get to last image in photos
  for (let i = 0; i < photos.length - 1; i++) {
    const rightArrow = container.querySelector(`.bi-arrow-right-circle`);
    fireEvent.click(rightArrow);
  }
  // expect the last image to show and not the right arrow
  expect(container.querySelector(`img[alt="testing image 3"]`)).toBeInTheDocument();
  expect(container.querySelector(`.bi-arrow-right-circle`)).not.toBeInTheDocument();
});
