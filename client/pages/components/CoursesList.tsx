import { Button, Note, Page, Spacer, Table, useModal } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Course } from '../api/courses';
import useCustomToast from '../hooks/useCustomToast';
import useFetchCourses, { CourseForTable } from '../hooks/useFetchCourses';

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

            {courses && <List courses={courses}fetchCourses={fetchCourses} />}
            {courses === null && (
                <Note type="warning">
                    There are no courses in the database.
                </Note>
            )}
            {courses === undefined && <Skeleton count={10} />}
        </Page.Content>
    );
};

// Sub-Components

interface ListProps {
    courses: CourseForTable[];
    fetchCourses: ReturnType<typeof useFetchCourses>;
}

const List = ({ courses,fetchCourses }: ListProps) => {
    const deletedToast = useCustomToast({
        message: 'Course is deleted',
        type: 'secondary',
    });
    const DeleteCourseButton = (
        value: any,
        rowData: CourseForTable,
        index: number
    ) => {
        const onClick = () => {
            fetch('/api/courses/' + rowData.id, { method: 'DELETE' }).then(
                (response) => {
                    deletedToast();
                    fetchCourses();
                }
            );
        };

        return (
            <Button
                type="error"
                auto
                scale={1 / 3}
                font="12px"
                onClick={onClick}
                disabled={String(rowData.deleted) === 'true'}
            >
                Delete
            </Button>
        );
    };
    return (
        <>
            <Table data={courses}>
                <Table.Column prop="id" label="id" />
                <Table.Column prop="name" label="name" />
                <Table.Column prop="description" label="description" />
                <Table.Column prop="status" label="status" />
                <Table.Column prop="type" label="type" />
                <Table.Column prop="category" label="category" />
                <Table.Column prop="deleted" label="deleted" />
                <Table.Column
                    prop="delete"
                    label="delete"
                    width={150}
                    render={DeleteCourseButton}
                />
            </Table>
        </>
    );
};

export default CoursesList;
