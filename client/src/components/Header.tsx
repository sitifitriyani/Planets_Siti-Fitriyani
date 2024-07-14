import { Home, User, Info } from "lucide-react";

export default function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="container mx-auto flex items-center justify-between p-7">
        <div className="flex items-center">
          <span className=" text-4xl font-bold">Planet Information </span>
        </div>
        <nav className="flex space-x-4">
          <a href="#home" className="flex items-center space-x-1 hover:text-gray-400">
            <Home />
            <span>Home</span>
          </a>
          <a href="#about" className="flex items-center space-x-1 hover:text-gray-400">
            <Info />
            <span>About</span>
          </a>
          <a href="#profile" className="flex items-center space-x-1 hover:text-gray-400">
            <User />
            <span>Profile</span>
          </a>
        </nav>
      </div>
    </header>
  );
}


