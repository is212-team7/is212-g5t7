export interface SkillCategory {
    [skillCategory: string]: Skill[];
}

export interface Skill {
    label: string;
    description: string;
}

export const skillCategories: SkillCategory = {
    sales: [
        { label: 'Product Knowledge', description: 'Description is empty.' },
        { label: 'Lead Qualification', description: 'Description is empty.' },
        { label: 'Lead Prospecting ', description: 'Description is empty.' },
        {
            label: 'Customer Needs Analysis',
            description: 'Description is empty.',
        },
        { label: 'Referral Marketing', description: 'Description is empty.' },
        {
            label: 'CRM Software (Salesforce, Hubspot, Zoho, Freshsales)',
            description: 'Description is empty.',
        },
        { label: 'POS Skills', description: 'Description is empty.' },
        { label: 'Cashier Skills', description: 'Description is empty.' },
        {
            label: 'Contract Negotiation',
            description: 'Description is empty.',
        },
    ],
    technology: [
        { label: 'Web Development', description: 'Description is empty.' },
        { label: 'Data Structures', description: 'Description is empty.' },
        { label: 'Security', description: 'Description is empty.' },
        { label: 'Machine Learning', description: 'Description is empty.' },
        { label: 'UX/UI', description: 'Description is empty.' },
        { label: 'Cloud Management', description: 'Description is empty.' },
        { label: 'Agile Development', description: 'Description is empty.' },
    ],
    marketing: [
        { label: 'SEO/SEM', description: 'Description is empty.' },
        { label: 'A/B Testing', description: 'Description is empty.' },
        {
            label: 'Social Media Marketing and Paid Social Media Advertising',
            description: 'Description is empty.',
        },
        {
            label: 'Sales Funnel Management',
            description: 'Description is empty.',
        },
        { label: 'CMS Tools', description: 'Description is empty.' },
        {
            label: 'Graphic Design Skills',
            description: 'Description is empty.',
        },
        {
            label: 'Email Marketing Skills',
            description: 'Description is empty.',
        },
        { label: 'Email Automation', description: 'Description is empty.' },
        { label: 'Data Visualization', description: 'Description is empty.' },
        { label: 'Typography', description: 'Description is empty.' },
        { label: 'Print Design', description: 'Description is empty.' },
        {
            label: 'Photography and Branding',
            description: 'Description is empty.',
        },
    ],
    admin: [
        { label: 'Data Entry', description: 'Description is empty.' },
        { label: 'Billing', description: 'Description is empty.' },
        { label: 'Scheduling', description: 'Description is empty.' },
        { label: 'Microsoft Office', description: 'Description is empty.' },
        { label: 'Shipping', description: 'Description is empty.' },
        { label: 'Salesforce', description: 'Description is empty.' },
    ],
};
