import { Dispatch, SetStateAction } from 'react';
import { Course } from '../api/courses';

export interface CourseForTable extends Course {
    delete: string;
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
            .then((result) => {
                if (Array.isArray(result)) {
                    if (result.length === 0) {
                        setCourses(null);
                        return;
                    }
                    setCourses(
                        result.map((row) => ({
                            ...row,
                            deleted: String(row.deleted),
                            delete: '',
                        }))
                    );
                }
            })
            .catch((e) => console.log(e));

export default useFetchCourses;
