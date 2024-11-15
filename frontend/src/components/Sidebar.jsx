import React from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ items }) => {
    const navigator = useNavigate();

    const handleLogout =()=>{
        navigator("/")
    }

  return (
    <aside className="w-full  m-2 p-2">
      <ul className="grid gap-4">
        {items.map((item, index) => (
          <li
            key={index}
            className={`p-4 rounded-lg text-center cursor-pointer ${item.bgColor}`}
            onClick={item.onClick}
          >
            <div className={`text-xl font-semibold ${item.textColor}`}>
              {item.label}
            </div>
          </li>
        ))}

        <li
          className={`p-4 rounded-lg text-center cursor-pointer bg-red-600 hover:bg-red-500 `}
          onClick={()=>handleLogout()}
        >
          <div className={`text-xl font-semibold text-white `}>Logout</div>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
