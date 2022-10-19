export interface Role {
    id: string;
    label: string;
    description: string;
}

export const roles: Role[] = [
    { id: '1', label: 'Sales Associate', description: 'Description is empty.' },
    {
        id: '2',
        label: 'Sales Representative',
        description: 'Description is empty.',
    },
    {
        id: '3',
        label: 'Account Executive',
        description: 'Description is empty.',
    },
    { id: '4', label: 'Sales Manager', description: 'Description is empty.' },
    { id: '5', label: 'Salesperson', description: 'Description is empty.' },
    { id: '6', label: 'Data Scientist', description: 'Description is empty.' },
    {
        id: '7',
        label: 'Software Developer',
        description: 'Description is empty.',
    },
    { id: '8', label: 'Web Developer', description: 'Description is empty.' },
    { id: '9', label: 'Sales Engineer', description: 'Description is empty.' },
    { id: '10', label: 'Data Analyst', description: 'Description is empty.' },
];
