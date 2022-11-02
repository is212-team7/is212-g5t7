import { Dispatch, SetStateAction } from 'react';
import { Course } from '../api/courses';

export interface CourseForTable extends Omit<Course, 'deleted'> {
    deleted: string;
}

interface useFetchCoursesProp {
    setCourses: Dispatch<SetStateAction<CourseForTable[] | null | undefined>>;
}

const useFetchCourses =
    ({ setCourses }: useFetchCoursesProp) =>
    () =>
        fetch('/api/courses', { method: 'GET' })
            .then((response) => {
                return response.json();
            })
            .then((result: CourseForTable[]) => {
                if (Array.isArray(result)) {
                    if (result.length === 0) {
                        setCourses(null);
                        return;
                    }
                    setCourses(
                        result.map((row) => ({
                            ...row,
                            deleted: String(row.deleted),
                        }))
                    );
                }
            })
            .catch((e) => console.log(e));

export default useFetchCourses;
