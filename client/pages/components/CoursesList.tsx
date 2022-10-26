import { Note, Page, Spacer, Table } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Course } from '../api/courses';
import { useFetchCourses } from '../hooks/useFetchCourses';

const CoursesList: NextPage = () => {
    const [courses, setCourses] = useState<Course[]>();
    const fetchCourses = useFetchCourses({ setCourses });

    useEffect(() => {
        fetchCourses();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Page.Content>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Courses</h2>
            </div>

            <Spacer height={2} />

            {courses && <List courses={courses} />}
            {courses == null && (
                <Note type="warning">
                    There are no courses in the database.
                </Note>
            )}
        </Page.Content>
    );
};

// Sub-Components

interface ListProps {
    courses: Course[];
}

const List = ({ courses }: ListProps) => {
    return (
        <>
            <Table data={courses}>
                <Table.Column prop="id" label="id" />
                <Table.Column prop="name" label="name" />
                <Table.Column prop="description" label="description" />
                <Table.Column prop="status" label="status" />
                <Table.Column prop="type" label="type" />
                <Table.Column prop="category" label="category" />
            </Table>
        </>
    );
};

export default CoursesList;
