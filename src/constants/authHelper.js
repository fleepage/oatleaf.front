const UserRole = {
  Admin: [
    { name: "work", level: "rw" },
    { name: "tools", level: "rw" },
    { name: "assessment", level: "rw" },
    { name: "student", level: "rw" },
    { name: "staff", level: "rw" },
    { name: "parent", level: "rw" },
    { name: "settings", level: "rw" },
    { name: "media", level: "rw" },
    { name: "event", level: "rw" },
    { name: "financials", level: "rw" },
    { name: "store", level: "rw" },
    { name: "cbt", level: "rw" },
  ],
  Teacher: [
    { name: "work", level: "rw" },
    { name: "assessment", level: "rw" },
    { name: "student", level: "rw" },
    { name: "parent", level: "rw" },
    { name: "settings", level: "rw" },
    { name: "media", level: "rw" },
    { name: "event", level: "rw" },
    { name: "financials", level: "rw" },
  ],
  Parent: [
    { name: "children", level: "rw" },
    { name: "financials", level: "rw" },
    { name: "work", level: "rw" },
  ],
  Student: [
    { name: "work", level: "rw" },
    { name: "assessment", level: "rw" },
    { name: "media", level: "rw" },
    { name: "event", level: "rw" },
    { name: "financials", level: "rw" },
  ],
  Organisation: [],
};

export { UserRole };
