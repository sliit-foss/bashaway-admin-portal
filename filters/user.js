import { activeFilters } from "./common"

export const userFilters = [
    {
        key: 'name',
        label: 'Name',
    },
    {
        key: 'email',
        label: 'Email',
    },
    {
        key: 'university',
        label: 'University',
    },
    {
        key: 'is_active',
        label: 'Status',
        options: activeFilters
    },
    {
        key: 'member_count',
        label: 'Member Count',
        directSearch: true
    },
    {
        key: 'role',
        label: 'Role',
        options: [
            {
                key: 'GROUP',
                label: 'Competitor',
            },
            {
                key: 'ADMIN',
                label: 'Admin',
            },
        ],
    },
]

export const userSorts = [
    {
        key: 'score',
        label: 'Sort by score',
        direction: 0,
    },
    {
        key: 'created_at',
        label: 'Sort by created date',
        direction: 0,
    },
]
