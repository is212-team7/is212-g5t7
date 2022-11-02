import { Dispatch, SetStateAction } from 'react';
import { Course } from '../api/courses';
import { Skill } from '../api/skills';

interface useFetchAssignedCoursesProps {
    setCourseSelected: Dispatch<SetStateAction<Course[] | undefined>>;
    skillId: Skill['id'];
}

const useFetchAssignedCourses = ({
    setCourseSelected,
    skillId,
}: useFetchAssignedCoursesProps) => {
    return async () => {
        // Get already-assigned courses to this skill
        const assignedCourses: Course[] = await (
            await fetch('/api/courses/skill/' + skillId)
        ).json();

        setCourseSelected(assignedCourses);
    };
};

export default useFetchAssignedCourses;
