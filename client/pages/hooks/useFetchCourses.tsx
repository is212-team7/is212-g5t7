import { Dispatch, SetStateAction } from 'react';
import { Course } from '../api/courses';

interface useFetchCoursesProp {
    setCourses: Dispatch<SetStateAction<Course[] | undefined>>;
}

const useFetchCourses =
    ({ setCourses }: useFetchCoursesProp) =>
    () =>
        fetch('/api/courses', { method: 'GET' })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                if (Array.isArray(result)) setCourses(result);
            })
            .catch((e) => console.log(e));

export default useFetchCourses;
