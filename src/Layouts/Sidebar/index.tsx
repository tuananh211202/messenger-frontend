import SendNowLogo from "../../Components/Logo";
import { GoHome, GoHomeFill } from "react-icons/go";
import { BiSearch, BiSearchAlt, BiLogOutCircle } from "react-icons/bi";
import { RiMessengerFill, RiMessengerLine, RiMailSendLine } from "react-icons/ri";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { MdOutlineAddBox } from "react-icons/md";
import { Button, Avatar, Input } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useSidebarContext } from "../../Services/Reducers/SidebarContext";
import { findByName, findContainByName, logOut } from "../../Middleware/api";
import { getCookie } from "typescript-cookie";
import "./style.css";
import { SearchProps } from "antd/es/input";
import { UserStatus } from "../../Middleware/constants";

const { Search } = Input;

interface User {
  name: string;
  username: string;
  description: string;
  avatar: string;
}

const SearchBox = () => {
  const [users, setUsers] = useState<User[]>([]);
  const navigate = useNavigate();
  const { sidebarDispatch } = useSidebarContext();

  const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    const data = await findContainByName(value);
    if(data.message === UserStatus.STATUS_OK) {
      setUsers(data.data || []);
    }
  }

  const handleClick = (name: string) => {
    navigate(`/profile/${name}`);
    sidebarDispatch({ type: "NAVIGATE" });
  };

  useEffect(() => {
    console.log(users);
  },[users]);

  return (
    <div 
      className="w-full h-full"
    >
      <div 
        className="w-full h-fit border-solid border-slate-300"
        style={{ borderBottomWidth: "1px" }}
      >
        <div className="w-full p-4 text-2xl font-semibold">Search</div>
        <Search size="large" className="p-4 pt-0" placeholder="Search" onSearch={onSearch} />
      </div>
      <div className="w-full h-full overflow-auto list-user">
        {
          users.map((user) => (
            <Button 
              key={user.name}
              type="text" 
              className="my-2 w-full px-8 py-4 h-fit flex items-start rounded-none"
              onClick={() => handleClick(user.name)}
            >
              {user.name}
            </Button>
          ))
        }
      </div>
    </div>
  );
}

const SideBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isHover, setIsHover] = useState(-1);
  const { sidebarState, sidebarDispatch } = useSidebarContext();
  const currentUser = JSON.parse(getCookie('user') || '');

  const onDraw = sidebarState.onSearch || sidebarState.onNoti;

  const isFull = !onDraw && currentPath !== "/messages";

  const navigate = useNavigate();

  const handleLogout = () => {
    logOut();
    navPath('/login');
  } 

  const navPath = (path: string) => {
    navigate(path);
    sidebarDispatch({ type: 'NAVIGATE' });
  }

  const buttonList = [
    {
      icon: (!onDraw && currentPath === "/") ? GoHomeFill : GoHome,
      text: (!onDraw && currentPath === "/") ? <strong>Home</strong> : "Home",
      action: () => navPath("/")
    },
    {
      icon: sidebarState.onSearch ? BiSearchAlt : BiSearch,
      text: "Search",
      action: () => sidebarDispatch({ type: 'OPEN_SEARCH' })
    },
    {
      icon: (!onDraw && currentPath === "/messages") ? RiMessengerFill : RiMessengerLine,
      text: (!onDraw && currentPath === "/messages") ? <strong>Messages</strong> : "Messages",
      action: () => navPath("/messages"),
    },
    {
      icon: sidebarState.onNoti ? AiFillHeart : AiOutlineHeart,
      text: "Notifications",
      action: () => sidebarDispatch({ type: 'OPEN_NOTI' })
    },
    {
      icon: MdOutlineAddBox,
      text: "Create",
      action: () => sidebarDispatch({ type: 'OPEN_CREATE_MODAL' })
    },
    {
      icon: Avatar,
      text: (!onDraw && currentPath === "/profile") ? <strong>Profile</strong> : "Profile",
      action: () => navPath(`/profile/${currentUser.name}`)
    },
    {
      icon: BiLogOutCircle,
      text: "Logout",
      action: () => handleLogout() 
    }
  ];

  const handleIconMouseEnter = (index: number) => {
    setIsHover(index);
  };

  const handleIconMouseLeave = () => {
    setIsHover(-1);
  };

  return <>
    <div className="flex">
      <div 
        className={"h-screen border-solid border-slate-300 relative " + (isFull ? "w-60" : "w-fit")} 
        style={{ borderRightWidth: "1px", transition: 'width 0.5s' }}
      >
        <div className={"h-24 flex items-center " + (isFull ? "w-56 ml-4" : "w-full flex items-center justify-center")}>
          {isFull ? <SendNowLogo color="#000" size={30} /> : <RiMailSendLine size={30} />}
        </div>
        {
          buttonList.map((item, index) => (
            <Button 
              key={index}
              type="text" 
              className={
                "m-2 p-2 flex items-center h-14 text-base " + 
                (isFull ? "w-56 " : "w-14 flex items-center justify-center ") + 
                (index === 6 ? "absolute bottom-1" : "")
              }
              onMouseEnter={() => handleIconMouseEnter(index)}
              onMouseLeave={handleIconMouseLeave}
              onClick={item.action}
            >
              <item.icon 
                size={(isHover !== index) ? 30 : 31} 
                className={isFull ? "mr-4" : ""} 
                src={index === 5 ? "https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png" : undefined} 
              />
              {isFull ? item.text : null}
            </Button>
          ))
        }
      </div>    
      <div 
        className={"h-screen border-solid border-slate-300 overflow-hidden "} 
        style={{ width: isFull ? "0px" : "400px", borderRightWidth: "1px", transition: 'width 0.5s' }}
      >
        <SearchBox />
      </div>
    </div>
  </>
};

export default SideBar;

