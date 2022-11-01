import { Button, Drawer, Note, Spacer } from '@geist-ui/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import {
    LearningJourney,
    LearningJourneyClientRequestAPI,
} from '../api/learningJourneys';
import { CoursesBySkill } from '../enroll/[roleId]';
import useCustomToast from '../hooks/useCustomToast';
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
        (selectedCoursesBySkill && selectedCoursesBySkill.size > 0) === true;
    const enrollSuccessToast = useCustomToast({
        message: 'Enrolled successfully into courses',
        type: 'success',
    });
    const enrollErrorToast = useCustomToast({
        message: 'Did not successfully enroll into courses',
        type: 'error',
    });

    const enroll = async () => {
        if (staff == null) return;
        const staffId = staff.id;
        if (
            staffId == null ||
            selectedCoursesBySkill == null ||
            roleId == null ||
            Array.isArray(roleId)
        )
            return;

        // Create new LJ for staff
        const createLJBody: LearningJourneyClientRequestAPI = {
            staffId,
            roleId: Number(roleId),
        };

        const createLJResult = await fetch('/api/learningJourneys', {
            method: 'POST',
            body: JSON.stringify(createLJBody),
            headers: { 'Content-Type': 'application/json' },
        });

        if (createLJResult.status !== 200) {
            enrollErrorToast();
            return;
        }

        const learningJourney: LearningJourney = await createLJResult.json();

        // Add the selected courses to LJ
        const addToLJBody = {
            courseIds: Array.from(selectedCoursesBySkill)
                .map(([_, course]) => course)
                .flat()
                .map((course) => course.id)
                .filter((id, i, self) => self.indexOf(id) === i),
        };
        const addToLJResult = await fetch(
            '/api/learningJourneys/courses/' + learningJourney.id,
            {
                method: 'POST',
                body: JSON.stringify(addToLJBody),
                headers: { 'Content-Type': 'application/json' },
            }
        );

        if (addToLJResult.status !== 200) {
            enrollErrorToast();
            return;
        }

        enrollSuccessToast();
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
                        selectedCoursesBySkill &&
                        Array.from(selectedCoursesBySkill).map(
                            ([skill, selectedCourses]) => (
                                <div key={skill.id}>
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
                                </div>
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
