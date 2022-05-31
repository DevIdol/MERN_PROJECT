import { FiSettings } from "react-icons/fi";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaBlog } from "react-icons/fa";

export const adminSideBarItem = [
  {
    id: 1,
    link: "/admin/dashboard",
    icon: <AiOutlineDashboard />,
    name: "Dashboard",
  },
  {
    id: 2,
    link: "/admin/blog",
    icon: <FaBlog />,
    name: "Blog",
  },
  {
    id: 3,
    link: "/admin/account",
    icon: <FiSettings />,
    name: "Account",
  },
];
