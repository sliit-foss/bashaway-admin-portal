import { activeFilters } from "./common";

export const userRoleOptions = [
  {
    key: "GROUP",
    label: "Team"
  },
  {
    key: "ADMIN",
    label: "Admin"
  },
  {
    key: "SPECTATOR",
    label: "Spectator"
  }
];

export const userFilters = [
  {
    key: "name",
    label: "Name"
  },
  {
    key: "email",
    label: "Email"
  },
  {
    key: "university",
    label: "University"
  },
  {
    key: "is_active",
    label: "Status",
    options: activeFilters
  },
  {
    key: "member_count",
    label: "Member Count",
    options: [
      {
        key: 1,
        label: "One"
      },
      {
        key: 2,
        label: "Two"
      },
      {
        key: 3,
        label: "Three"
      },
      {
        key: 4,
        label: "Four"
      }
    ]
  },
  {
    key: "role",
    label: "Role",
    options: userRoleOptions
  }
];
