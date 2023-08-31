export const submissionFilters = [
  {
    key: "user",
    label: "Team Name",
    options: []
  },
  {
    key: "graded",
    label: "Status",
    options: [
      {
        key: "true",
        label: "Graded"
      },
      {
        key: "false",
        label: "Not Graded"
      }
    ]
  }
];

export const submissionSorts = [
  {
    key: "created_at",
    label: "Sort by upload time",
    direction: -1
  },
  {
    key: "score",
    label: "Sort by score",
    direction: 0
  }
];
