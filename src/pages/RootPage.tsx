import { Outlet } from "react-router-dom";

export default function RootPage() {
  return (
    <div>
      <header>Header</header>
      <Outlet />
      <footer>Footer</footer>
    </div>
  );
}
