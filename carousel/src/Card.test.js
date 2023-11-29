import { render, fireEvent } from "@testing-library/react";
import Card from "./Card.js";
import TEST_IMAGES from "./_testCommon.js";

//TODO Mentor: Smoke test for Card
it("renders the card without error", function () {
  render(<Card />);
});

// TODO Mentor: Snapshot test for Card
it("snapshot <Card/> test", function () {
  const { asFragment } = render(<Card />);
  expect(asFragment()).toMatchSnapshot();
});
