import { toast } from "react-toastify";
import { showNotification } from "./Notification";

jest.mock("react-toastify", () => {
  return {
    toast: {
      success: jest.fn(),
      error: jest.fn(),
      info: jest.fn(),
    },
  };
});

describe("Notification", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should show a success notification", () => {
    const message = "Success message";
    const type = "success";

    showNotification({ message, type });

    expect(toast.success).toHaveBeenCalledWith(message);
  });

  it("should show an error notification", () => {
    const message = "Error message";
    const type = "error";

    showNotification({ message, type });

    expect(toast.error).toHaveBeenCalledWith(message);
  });

  it("should show an info notification", () => {
    const message = "Info message";
    const type = "info";

    showNotification({ message, type });

    expect(toast.info).toHaveBeenCalledWith(message);
  });
});
