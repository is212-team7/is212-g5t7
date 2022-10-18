export interface RoleCategory {
  [roleCategory: string]: Role[];
}

export interface Role {
  label: string;
  description: string;
}

export const roleCategories: RoleCategory = {
  sales: [
    { label: 'Sales Associate', description: 'Description is empty.' },
    { label: 'Sales Representative', description: 'Description is empty.' },
    { label: 'Account Executive', description: 'Description is empty.' },
    { label: 'Sales Manager', description: 'Description is empty.' },
    { label: 'Salesperson', description: 'Description is empty.' },
  ],
  technology: [
    { label: 'Data Scientist', description: 'Description is empty.' },
    { label: 'Software Developer', description: 'Description is empty.' },
    { label: 'Web Developer', description: 'Description is empty.' },
    { label: 'Sales Engineer', description: 'Description is empty.' },
    { label: 'Data Analyst', description: 'Description is empty.' },
  ]
};