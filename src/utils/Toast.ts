import { toast } from "react-toastify";

interface ToastProps {
  message: string;
  type: "success" | "error";
}

export function showToast({ message, type }: ToastProps) {
  if (type === "success") {
    toast.success(message, {
      position: "bottom-right",
      theme: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
      style: {
        backgroundColor: document.documentElement.classList.contains("dark")
          ? "#262626"
          : "#fff",
        color: document.documentElement.classList.contains("dark")
          ? "#fff"
          : "#000",
      },
    });
  } else {
    toast.error(message, {
      position: "bottom-right",
      theme: document.documentElement.classList.contains("dark")
        ? "dark"
        : "light",
      style: {
        backgroundColor: document.documentElement.classList.contains("dark")
          ? "#262626"
          : "#fff",
        color: document.documentElement.classList.contains("dark")
          ? "#fff"
          : "#000",
      },
    });
  }
}
