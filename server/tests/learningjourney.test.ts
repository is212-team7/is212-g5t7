import fetch from 'node-fetch';

jest.setTimeout(10000);

// Get a random staff ID
const StaffId = 150115;
const randomRole = {
    Role_ID: 1,
    Role_Name: 'Programme Manager',
    Role_Description: 'manage programmes',
    Role_Deleted: false,
    createdAt: '2022-10-29T07:03:40.000Z',
    updatedAt: '2022-10-29T07:03:40.000Z',
};
let RoleId: number = 1;
// get random course id
const CourseId = 'SAL001';

let LJ_ID: number;

test('create learning journey', async () => {
    // assign Role to role
    const createLJResponse = await fetch(
        `http://localhost:3001/learningJourneys`,
        {
            method: 'POST',
            body: JSON.stringify({
                Staff_ID: StaffId,
                Role_ID: randomRole.Role_ID,
            }),
            headers: { 'Content-Type': 'application/json' },
        }
    );
    expect(createLJResponse.status).toBe(200);
    const LJ = await createLJResponse.json();
    LJ_ID = LJ.LJ_ID;
    expect(LJ.Role_ID).toBe(RoleId);
    expect(LJ.Staff_ID).toBe(StaffId);
});

test('add course to learning journey', async () => {
    // get Roles by role
    const addCourseToLJResponse = await fetch(
        `http://localhost:3001/learningJourneys/courses/${LJ_ID}`,
        {
            method: 'POST',
            body: JSON.stringify({
                course_ids: [CourseId],
            }),
            headers: { 'Content-Type': 'application/json' },
        }
    );
    expect(addCourseToLJResponse.status).toBe(200);
    const LJ = await addCourseToLJResponse.json();
    expect(LJ.Course[0].Course_ID).toEqual(CourseId);
});

test('delete course from learning journey', async () => {
    // get Roles by role
    const deleteCourseToLJResponse = await fetch(
        `http://localhost:3001/learningJourneys/${LJ_ID}/course/${CourseId}`,
        {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    expect(deleteCourseToLJResponse.status).toBe(200);
});

test('get learning journey for staff', async () => {
    // get Roles by role
    const getLJResponse = await fetch(
        `http://localhost:3001/learningJourneys/staff/${StaffId}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    expect(getLJResponse.status).toBe(200);
    const LJ = await getLJResponse.json();
    expect(Array.isArray(LJ)).toBe(true);
});

test('delete learning journey', async () => {
    // assign Role to role
    const deleteLJResponse = await fetch(
        `http://localhost:3001/learningJourneys/${LJ_ID}`,
        {
            method: 'DELETE',
        }
    );
    expect(deleteLJResponse.status).toBe(200);
});
