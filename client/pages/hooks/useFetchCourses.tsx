import { Dispatch, SetStateAction } from 'react';
import { Course } from '../api/courses';

interface useFetchCoursesProp {
    setCourses: Dispatch<SetStateAction<Course[] | null | undefined>>;
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
                    setCourses(result);
                }
            })
            .catch((e) => console.log(e));

export default useFetchCourses;
