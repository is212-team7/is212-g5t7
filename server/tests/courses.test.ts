import { CourseModel } from '@lib/models/Course';
import fetch from 'node-fetch';

const randomCourse = {
    Course_ID: 'COR001',
    Course_Name: 'Systems Thinking and Design',
    Course_Desc:
        'This foundation module aims to introduce students to the fundamental concepts and underlying principles of systems thinking,',
    Course_Status: 'Active',
    Course_Type: 'Internal',
    Course_Category: 'Core',
};

test('get courses', async () => {
    const coursesResponse = await fetch(`http://localhost:3001/courses`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
    });
    const courses = (await coursesResponse.json()) as CourseModel[];
    expect(Array.isArray(courses)).toBe(true);
});

test('view course details', async () => {
    const courseResponse = await fetch(
        `http://localhost:3001/courses/${randomCourse.Course_ID}`,
        {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        }
    );
    const course = (await courseResponse.json()) as CourseModel;
    expect(course.Course_Name).toBe(randomCourse.Course_Name);
    expect(course.Course_Desc).toBe(randomCourse.Course_Desc);
    expect(course.Course_Status).toBe(randomCourse.Course_Status);
    expect(course.Course_Type).toBe(randomCourse.Course_Type);
    expect(course.Course_Category).toBe(randomCourse.Course_Category);
});
