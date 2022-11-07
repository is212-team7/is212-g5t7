import {
    Card,
    Divider,
    Loading,
    Note,
    Page,
    Spacer,
    Tag,
    Text,
} from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Course } from '../api/courses';
import { Skill } from '../api/skills';
import { Staff } from '../api/staffs';
import PageWithNavBar from '../components/PageWithNavBar';

interface StaffCourseSkills {
    staff: Staff;
    courses: Course[];
    skills: Skill[];
}

const AdminSkillsPage: NextPage = () => {
    const [staffCourseSkills, setStaffCourseSkills] =
        useState<StaffCourseSkills[]>();

    useEffect(() => {
        (async () => {
            // Get staff with at least one LJ
            const staffIds: number[] = await (
                await fetch('/api/staffs/participating/ids')
            ).json();

            const staffs: Staff[] = await Promise.all(
                staffIds.map(
                    async (id) =>
                        await (await fetch('/api/staffs/' + id)).json()
                )
            );

            const staffCourseSkills: StaffCourseSkills[] = await Promise.all(
                staffs.map(async (staff) => {
                    const courses = await (
                        await fetch('/api/staffs/' + staff.id + '/courses')
                    ).json();
                    const skills: Skill[] = await (
                        await fetch('/api/staffs/' + staff.id + '/skills')
                    ).json();

                    return {
                        staff,
                        courses,
                        skills: Array.from(
                            new Map(
                                skills.map((skill) => [skill.id, skill])
                            ).values()
                        ),
                    };
                })
            );

            setStaffCourseSkills(staffCourseSkills);
        })();
    }, []);

    return (
        <PageWithNavBar homeLink="/roles">
            <Page.Content>
                <h2>Staff Skills and Courses</h2>
                <Spacer h={2} />
                {staffCourseSkills != null &&
                    staffCourseSkills.map((record) => (
                        <StaffLearningJourneyCard
                            key={record.staff.id}
                            record={record}
                        />
                    ))}
                {staffCourseSkills === undefined && (
                    <Loading
                        style={{ width: '100%', height: '80%', zoom: '200%' }}
                    />
                )}
                {staffCourseSkills === null && (
                    <Note type="warning">
                        No learning journeys have been created yet.
                    </Note>
                )}
            </Page.Content>
        </PageWithNavBar>
    );
};

export default AdminSkillsPage;

// Sub-components

interface StaffLearningJourneyCardProps {
    record: StaffCourseSkills;
}

const StaffLearningJourneyCard = ({
    record,
}: StaffLearningJourneyCardProps) => {
    return (
        <Card style={{ marginBottom: '2em' }}>
            <Text h3 my={0}>
                {record.staff.id}: {record.staff.fName} {record.staff.lName}
            </Text>

            <Spacer height={1} />
            <Divider h="1px" my={0} />
            <Spacer height={1} />

            <Text h4>Skills</Text>
            <ul>
                {record.skills.length !== 0 ? (
                    record.skills.map((skill) => (
                        <li key={skill.id} style={{ display: 'flex' }}>
                            <Tag type="default" invert>
                                {skill.id}
                            </Tag>{' '}
                            <Spacer width={0.2} />
                            {skill.name}
                        </li>
                    ))
                ) : (
                    <Note type="warning">
                        There are no skills selected yet.
                    </Note>
                )}
            </ul>
            <Spacer height={1} />
            <Text h4>Courses</Text>
            <ul>
                {record.courses.length !== 0 ? (
                    record.courses.map((course) => (
                        <li key={course.id} style={{ display: 'flex' }}>
                            <Tag type="default" invert>
                                {course.id}
                            </Tag>{' '}
                            <Spacer width={0.4} />
                            {course.name}
                        </li>
                    ))
                ) : (
                    <Note type="warning">
                        There are no courses selected yet.
                    </Note>
                )}
            </ul>
        </Card>
    );
};
