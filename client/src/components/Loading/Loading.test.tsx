import { render, screen } from "@testing-library/react";
import Loading from "./Loading";

describe("Loading Component", () => {
  it("renders without crashing", () => {
    render(<Loading />);
    const loader = screen.getByTestId("loader");
    expect(loader).toBeInTheDocument();
  });
});
