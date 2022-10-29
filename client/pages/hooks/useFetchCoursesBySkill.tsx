import { Dispatch, SetStateAction } from 'react';
import { Course } from '../api/courses';

interface useFetchCoursesProp {
    setCoursesBySkill: Dispatch<SetStateAction<Course[] | null | undefined>>;
    skillId: number;
}

const useFetchCoursesBySkill =
    ({ setCoursesBySkill, skillId }: useFetchCoursesProp) =>
    () =>
        fetch('/api/courses/skill/' + skillId, { method: 'GET' })
            .then((response) => {
                console.log({ response });
                return response.json();
            })
            .then((result: Course[]) => {
                if (Array.isArray(result)) {
                    if (result.length === 0) {
                        setCoursesBySkill(null);
                        return;
                    }
                    setCoursesBySkill(result);
                }
            })
            .catch((e) => console.log(e));

export default useFetchCoursesBySkill;
