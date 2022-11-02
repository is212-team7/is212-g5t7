import { Note, Page, Spacer, Table } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import useFetchCourses, { CourseForTable } from '../hooks/useFetchCourses';
import Loading from './Loading';

const CoursesList: NextPage = () => {
    const [courses, setCourses] = useState<CourseForTable[] | null>();
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
            {courses === null && (
                <Note type="warning">
                    There are no courses in the database.
                </Note>
            )}
            {courses === undefined && <Loading />}
        </Page.Content>
    );
};

// Sub-Components

interface ListProps {
    courses: CourseForTable[];
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
