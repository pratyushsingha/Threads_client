import { Link } from "react-router-dom";
import { sidebarItems, Button } from "./Index";
const Sidebar = () => {
  return (
    <div className="flex flex-row space-x-8 md:space-x-0 justify-between w-full md:flex-col">
      {sidebarItems.map((item) => (
        <Link key={item._id} to={`${item.path}`}>
          <Button variant="ghost" className="text-6xl">
            {item.icon}
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
