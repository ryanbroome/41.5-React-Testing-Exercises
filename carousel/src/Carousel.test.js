import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import photos from "./photos.js";
import TEST_IMAGES from "./_testCommon.js";

//TODO Mentor: Smoke test for Carousel, got it to work but not sure if this syntax is correct
it("renders the carousel without error", function () {
  const carouselPhotos = photos;
  const carouselTitle = "Test Title";
  render(<Carousel photos={carouselPhotos} title={carouselTitle} />);
});

// TODO Mentor: Snapshot test for Carousel
it("snapshot <Carousel/> test", function () {
  const carouselPhotos = photos;
  const carouselTitle = "Test Title";

  const { asFragment } = render(<Carousel photos={carouselPhotos} title={carouselTitle} />);
  expect(asFragment()).toMatchSnapshot();
});

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
