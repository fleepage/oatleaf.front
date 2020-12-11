import { adminRoot } from "./defaultValues";
import { UserRole } from "./authHelper";

const data = [
  {
    id: "home",
    icon: "simple-icon-home",
    label: "Home",
    to: `${adminRoot}/home`,
  },
  {
    id: "notification",
    icon: "simple-icon-bell",
    label: "Notification",
    to: `${adminRoot}/history`,
  },
  {
    id: "children",
    icon: "iconsminds-students",
    label: "My Child/Children",
    to: `${adminRoot}/history`,
    permission: "children",
  },
  {
    id: "work",
    icon: "simple-icon-notebook",
    label: "School work",
    to: `${adminRoot}/history`,
    permission: "work",
  },
  {
    id: "tools",
    icon: "simple-icon-wrench",
    label: "Tools",
    to: `${adminRoot}/utility-bill`,
    permission: "tools",
    subs: [
      {
        icon: "iconsminds-building",
        label: "Classroom",
        to: `${adminRoot}/support/faq`,
        // permission: [UserRole.Admin],
      },
      {
        icon: "simple-icon-clock",
        label: "Student Attendance",
        to: `${adminRoot}/support/ticket`,
        // permission: [UserRole.Admin],
      },
      {
        icon: "simple-icon-clock",
        label: "Teacher Attendance",
        to: `${adminRoot}/support/ticket`,
        // permission: [UserRole.Admin],
      },
    ],
  },
  {
    id: "assessment",
    icon: "simple-icon-chart",
    label: "Assessment",
    to: `${adminRoot}/support`,
    permission: "assessment",
    subs: [
      {
        icon: "simple-icon-chart",
        label: "Student Assessment",
        to: `${adminRoot}/support/faq`,
        // permission: [UserRole.Admin],
      },
      {
        icon: "simple-icon-chart",
        label: "Teacher assessment",
        to: `${adminRoot}/support/ticket`,
        // permission: [UserRole.Admin],
      },
    ],
  },
  {
    id: "studnts",
    icon: "iconsminds-students",
    label: "Student",
    to: `${adminRoot}/support`,
    permission: "student",
  },
  {
    id: "staff",
    icon: "iconsminds-business-man-woman",
    label: "Staff",
    to: `${adminRoot}/support`,
    permission: "staff",
    subs: [
      {
        icon: "simple-icon-chart",
        label: "Teacher(s)",
        to: `${adminRoot}/support/faq`,
        // permission: [UserRole.Admin],
      },
      {
        icon: "simple-icon-clock",
        label: "Other",
        to: `${adminRoot}/support/ticket`,
        // permission: [UserRole.Admin],
      },
    ],
  },
  {
    id: "parent",
    icon: "iconsminds-affiliate",
    label: "Parent",
    to: `${adminRoot}/support`,
    permission: "parent",
  },
  {
    id: "settings",
    icon: "simple-icon-settings",
    label: "Settings",
    to: `${adminRoot}/support`,
    permission: "settings",
  },
  {
    id: "media",
    icon: "iconsminds-video-tripod",
    label: "Media",
    to: `${adminRoot}/support`,
    permission: "media",
  },
  {
    id: "event",
    icon: "simple-icon-event",
    label: "Event",
    to: `${adminRoot}/support`,
    permission: "event",
  },
  {
    id: "financials",
    icon: "iconsminds-financial",
    label: "Financials",
    to: `${adminRoot}/support`,
    permission: "financials",
  },
  {
    id: "store",
    icon: "iconsminds-shop",
    label: "My Store",
    to: `${adminRoot}/history`,
    permission: "store",
  },
  {
    id: "app",
    icon: "iconsminds-shop",
    label: "OatStore",
    to: `${adminRoot}/history`,
    // permission: [UserRole.Teacher],
  },
];
export default data;
