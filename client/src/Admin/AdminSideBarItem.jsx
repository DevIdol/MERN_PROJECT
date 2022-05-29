import { FiSettings } from "react-icons/fi";
import { FaBlog } from "react-icons/fa";

export const adminSideBarItem = [
  {
    id: 1,
    link: "/admin/blog",
    icon: <FaBlog />,
    name: "Blog",
  },
  {
    id: 2,
    link: "/admin/account",
    icon: <FiSettings />,
    name: "Account",
  },
];
