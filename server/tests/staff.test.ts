import { CourseModel } from '@lib/models/Course';
import { SkillModel } from '@lib/models/Skill';
import { StaffModel } from '@lib/models/Staff';
import fetch from 'node-fetch';

jest.setTimeout(10000);

const sampleStaff = {
    Staff_ID: 140001,
    Staff_FName: 'Derek',
    Staff_LName: 'Tan',
    Dept: 'Sales',
    Email: 'Derek.Tan@allinone.com.sg',
    System_Role_ID: 3,
};

test('view 1 staff detail', async () => {
    const viewStaffResponse = await fetch(
        `http://localhost:3001/staffs/${sampleStaff.Staff_ID}`,
        { method: 'GET' }
    );
    expect(viewStaffResponse.status).toBe(200);
    const staff = (await viewStaffResponse.json()) as StaffModel;
    expect(staff.Staff_ID).toBe(sampleStaff.Staff_ID);
    expect(staff.Staff_FName).toBe(sampleStaff.Staff_FName);
    expect(staff.Staff_LName).toBe(sampleStaff.Staff_LName);
    expect(staff.Dept).toBe(sampleStaff.Dept);
    expect(staff.Email).toBe(sampleStaff.Email);
    expect(staff.System_Role_ID).toBe(sampleStaff.System_Role_ID);
});

test('staff login', async () => {
    const viewStaffResponse = await fetch(
        `http://localhost:3001/staffs/login`,
        {
            method: 'POST',
            body: JSON.stringify({
                Email: sampleStaff.Email,
            }),
            headers: { 'Content-Type': 'application/json' },
        }
    );
    expect(viewStaffResponse.status).toBe(200);
    const staff = await viewStaffResponse.json();
    expect(staff.Staff_ID).toBe(sampleStaff.Staff_ID);
    expect(staff.Staff_FName).toBe(sampleStaff.Staff_FName);
    expect(staff.Staff_LName).toBe(sampleStaff.Staff_LName);
    expect(staff.Dept).toBe(sampleStaff.Dept);
    expect(staff.Email).toBe(sampleStaff.Email);
    expect(staff.System_Role).toBe('Manager');
});

test('view staff skills', async () => {
    // assign skill to role
    const viewStaffSkillsResponse = await fetch(
        `http://localhost:3001/staffs/${sampleStaff.Staff_ID}/skills`,
        { method: 'GET' }
    );
    expect(viewStaffSkillsResponse.status).toBe(200);
    const skills = (await viewStaffSkillsResponse.json()) as SkillModel[];
    expect(Array.isArray(skills)).toBe(true);
});

test('view staff courses', async () => {
    // get skills by role
    const viewStaffCoursesResponse = await fetch(
        `http://localhost:3001/staffs/${sampleStaff.Staff_ID}/courses`,
        { method: 'GET' }
    );
    expect(viewStaffCoursesResponse.status).toBe(200);
    const courses = (await viewStaffCoursesResponse.json()) as CourseModel[];
    expect(Array.isArray(courses)).toBe(true);
});
