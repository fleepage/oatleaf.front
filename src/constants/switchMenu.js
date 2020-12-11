import { accountRoot } from "./defaultValues";

const data = [
  {
    id: "home",
    icon: "simple-icon-home",
    label: "Home",
    to: `${accountRoot}/home`,
  },
  {
    id: "school",
    icon: "simple-icon-bell",
    label: "Schools",
    to: `${accountRoot}/history`,
  },
  {
    id: "master",
    icon: "iconsminds-students",
    label: "Master Class",
    to: `${accountRoot}/history`,
    permission: "children",
  },
  {
    id: "faq",
    icon: "iconsminds-students",
    label: "Faq",
    to: `${accountRoot}/history`,
    permission: "children",
  },
];
export default data;
