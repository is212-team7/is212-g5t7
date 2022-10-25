export interface RoleSkillCategory {
    [roleskillCategory: string]: RoleSkill[];
  }

  export interface RoleSkill {
    label: string;
    description: string;
  }

  export const roleskillCategories: RoleSkillCategory = {
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