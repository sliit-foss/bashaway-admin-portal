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
  },
  {
    key: "automatically_graded",
    label: "Grading Type",
    options: [
      {
        key: "true",
        label: "Auto Graded"
      },
      {
        key: "false",
        label: "Manually Graded"
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
    direction: -1
  },
  {
    key: "updated_at",
    label: "Sort by last updated",
    direction: -1
  }
];
