import { fireEvent, render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input component", () => {
  it("renders without errors", () => {
    render(<Input placeholder='Enter text' type='text' />);
  });

  it("calls onChange callback when input value changes", () => {
    const onChangeMock = jest.fn();
    render(
      <Input placeholder='Enter text' type='text' onChange={onChangeMock} />
    );

    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "Hello" } });

    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith(expect.any(Object));
  });

  it("displays error message when error prop is provided", () => {
    render(
      <Input placeholder='Enter text' type='text' error={true} name='test' />
    );

    const errorElement = screen.getByText("Error en test");
    expect(errorElement).toBeInTheDocument();
  });
});
