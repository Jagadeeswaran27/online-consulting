import { Outlet } from "react-router-dom";
import Header from "../components/header/Header";
export default function RootPage() {
  return (
    <div className="dark:text-white dark:bg-darkTheme ">
      <Header />
      <Outlet />
    </div>
  );
}
