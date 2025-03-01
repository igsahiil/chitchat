import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <main className="flex-1 w-full overflow-hidden">
        <div className="h-full">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
}
