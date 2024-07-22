import { render, screen } from "@testing-library/react";
import Rating from "./Rating";

describe("Rating component", () => {
  it("renders the rating value", () => {
    const ratingValue = 4;
    render(<Rating value={ratingValue} />);
    const activeStars = screen
      .getAllByText("★")
      .filter((star) => star.classList.contains("active"));
    expect(activeStars).toHaveLength(ratingValue);
  });

  it("calls the onClick function when clicked", () => {
    const onClickMock = jest.fn();
    render(<Rating value={3} onClick={onClickMock} />);
    const ratingElement = screen.getAllByText("★");
    ratingElement[0].click();
    expect(onClickMock).toHaveBeenCalled();
  });
});
