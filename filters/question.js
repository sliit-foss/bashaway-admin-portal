export const questionFilters = [
  {
    key: 'name',
    label: 'Name',
  },
  {
    key: 'difficulty',
    label: 'Difficulty',
    options: [
      {
        key: 'EASY',
        label: 'Easy',
      },
      {
        key: 'MEDIUM',
        label: 'Medium',
      },
      {
        key: 'HARD',
        label: 'Hard',
      },
      {
        key: 'EXTREME',
        label: 'Extreme',
      },
    ],
  },
]

export const questionSorts = [
  {
    key: 'max_score',
    label: 'Sort by maximum score',
    direction: 0,
  },
]
