import { Link } from "react-router-dom";
import { sidebarItems, Button } from "./Index";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const { user } = useSelector((store) => store.auth);
  return (
    <>
      <div className="flex  md:flex-col justify-between md:justify-center md:items-center md:h-screen md:space-y-5 py-5 px-4">
        {sidebarItems.map((item) => (
          <Link
            key={item._id}
            to={
              item.title === "profile"
                ? `${item.title}/${user.username}`
                : `${item.title}`
            }
          >
            <Button variant="ghost" className="p-3">
              <p className="text-2xl md:text-3xl py-2">{item.icon}</p>
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Sidebar;
