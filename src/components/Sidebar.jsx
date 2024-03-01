import { sidebarItems, Button } from "./Index";
const Sidebar = () => {
  return (
    <div className="sm:col-span-2 sticky start-0 bottom-0 top-0 left-0 right-0">
      <div className="flex flex-col space-y-3">
        {sidebarItems.map((item) => (
          <Button
            variant="ghost"
            key={item._id}
            className="flex space-x-3 justify-start"
          >
            {item.icon}
            <p className="hidden sm:block">{item.title}</p>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
