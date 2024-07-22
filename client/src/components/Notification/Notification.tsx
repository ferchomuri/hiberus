import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface ShowNotificationProps {
  message: string;
  type: "success" | "error" | "info";
}

export const showNotification = ({ message, type }: ShowNotificationProps) => {
  switch (type) {
    case "success":
      toast.success(message);
      break;
    case "error":
      toast.error(message);
      break;
    case "info":
      toast.info(message);
      break;
    default:
      break;
  }
};
