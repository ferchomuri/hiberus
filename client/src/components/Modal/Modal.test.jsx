import { fireEvent, render, screen } from "@testing-library/react";
import Modal from "./Modal";

describe("Modal", () => {
  it("renders modal content", () => {
    render(<Modal isOpen={true} onClose={() => {}} />);

    const modalContent = screen.getByText("X");
    expect(modalContent).toBeInTheDocument();
  });

  it("calls onClose when close button is clicked", () => {
    const onCloseMock = jest.fn();
    render(<Modal isOpen={true} onClose={onCloseMock} />);

    const closeButton = screen.getByRole("button", { name: "X" });
    fireEvent.click(closeButton);

    expect(onCloseMock).toHaveBeenCalled();
  });
});
