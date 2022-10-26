type SystemRole = 'Admin' | 'User' | 'Manager' | 'Trainer';

export type StaffAPI = {
    Staff_ID: number;
    Staff_FName?: string;
    Staff_LName?: string;
    Dept?: string;
    Email: string;
    System_Role: SystemRole;
};

export type Staff = {
    id: number;
    fName?: string;
    lName?: string;
    dept?: string;
    email: string;
    systemRole: SystemRole;
};
