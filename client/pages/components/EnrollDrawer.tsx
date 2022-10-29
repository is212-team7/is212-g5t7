import { Button, Drawer, Note, Spacer } from '@geist-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { LearningJourneyPost } from '../api/learningJourneys';
import { CoursesBySkill } from '../enroll/[roleId]';
import useSessionStorage from '../hooks/useSessionStorage';

interface EnrollDrawerProps {
    selectedCoursesBySkill?: CoursesBySkill;
}

const EnrollDrawer = ({ selectedCoursesBySkill }: EnrollDrawerProps) => {
    const router = useRouter();
    const { roleId } = router.query;
    const staff = useSessionStorage();
    const [state, setState] = useState(false);
    const areCoursesSelected =
        selectedCoursesBySkill && selectedCoursesBySkill.size > 0;

    const enroll = () => {
        if (staff == null) return;
        const staffId = staff.id;
        if (staffId == null || selectedCoursesBySkill == null) return;

        Array.from(selectedCoursesBySkill).forEach(
            ([skill, coursesBySkill]) => {
                coursesBySkill.forEach((course) => {
                    const body: LearningJourneyPost = {
                        staffId: staffId,
                        roleId: Number(roleId),
                        courseId: course.id,
                    };

                    fetch('/api/learningJourneys', {
                        method: 'POST',
                        body: JSON.stringify(body),
                        headers: { 'Content-Type': 'application/json' },
                    }).then((result) => console.log(result));
                });
            }
        );

        router.push('/learning-journey');
    };

    return (
        <>
            <Button auto onClick={() => setState(true)} type="secondary">
                Enroll
            </Button>
            <Drawer
                visible={state}
                onClose={() => setState(false)}
                placement="right"
            >
                <Drawer.Title>Courses to Enroll</Drawer.Title>

                <Spacer width={1} />

                {areCoursesSelected && (
                    <Drawer.Subtitle>
                        You are about to enroll in the
                        <br />
                        following courses for role {roleId}:
                    </Drawer.Subtitle>
                )}

                <Spacer width={1} />

                <Drawer.Content>
                    {areCoursesSelected &&
                        Array.from(selectedCoursesBySkill).map(
                            ([skill, selectedCourses]) => (
                                <>
                                    <h3>{skill.name}</h3>
                                    <ul>
                                        {selectedCourses.map(
                                            (selectedCourse) => (
                                                <li key={selectedCourse.id}>
                                                    {selectedCourse.id}:{' '}
                                                    {selectedCourse.name}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </>
                            )
                        )}
                    {!areCoursesSelected && (
                        <Note type="warning">
                            You have not selected any courses yet.
                        </Note>
                    )}
                </Drawer.Content>
                {areCoursesSelected && (
                    <>
                        <Spacer height={2} />
                        <Button type="secondary" onClick={enroll}>
                            Enroll
                        </Button>
                    </>
                )}
            </Drawer>
        </>
    );
};

export default EnrollDrawer;