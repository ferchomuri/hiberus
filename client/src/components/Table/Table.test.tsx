import { render, screen } from "@testing-library/react";
import Table from "./Table";

const data = [
  {
    id: 1234,
    name: "John Doe",
    email: "jdoe@gmail.com",
  },
  {
    id: 2345,
    name: "Jane Doe",
    email: "jandoe@gmail.com",
  },
  {
    id: 36787,
    name: "John Smith",
    email: "jsmith@smith.com",
  },
];
const columns = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Email",
    name: "email",
  },
];

describe("Render Table component", () => {
  it("renders without crashing", () => {
    render(<Table data={[]} columns={[]} loading={false} />);
    const table = screen.getByRole("table");
    expect(table).toBeInTheDocument();
  });
  it("renders loading message", () => {
    render(<Table data={[]} columns={[]} loading={true} />);
    const loading = screen.getByText("Loading...");
    expect(loading).toBeInTheDocument();
  });
  it("renders table with data", () => {
    render(<Table data={data} columns={columns} loading={false} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);

    const headers = screen.getAllByRole("columnheader");
    expect(headers).toHaveLength(3);
  });

  it("renders table with data and sorts by name", () => {
    render(<Table data={data} columns={columns} loading={false} />);
    const rows = screen.getAllByRole("row");
    expect(rows).toHaveLength(4);

    const nameHeader = screen.getByText("Name");
    nameHeader.click();

    const sortedNames = screen
      .getAllByRole("row")
      .map((row) => row.textContent);

    expect(sortedNames).toEqual([
      "#NameEmail",
      "1John Doejdoe@gmail.com",
      "2Jane Doejandoe@gmail.com",
      "3John Smithjsmith@smith.com",
    ]);
  });
});
