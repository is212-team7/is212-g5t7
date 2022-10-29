import {
    Card,
    Checkbox,
    Divider,
    Grid,
    Link,
    Modal,
    Note,
    Page,
    Spacer,
    Text,
    useModal,
} from '@geist-ui/core';
import type { NextPage } from 'next';
import { useRouter } from 'next/router';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Course } from '../api/courses';
import { Skill } from '../api/skills';
import EnrollDrawer from '../components/EnrollDrawer';
import PageWithNavBar from '../components/PageWithNavBar';
import useFetchCoursesBySkill from '../hooks/useFetchCoursesBySkill';

export type CoursesBySkill = Map<Skill, Course[]>;

const EnrollPage: NextPage = () => {
    const router = useRouter();
    const { roleId } = router.query;
    const [skills, setSkills] = useState<Skill[] | null>([]);
    const [selectedCoursesBySkill, setSelectedCoursesBySkill] =
        useState<CoursesBySkill>(new Map());

    useEffect(() => {
        if (roleId == null) return;
        fetch('/api/skills/role/' + roleId, { method: 'GET' })
            .then((response) => response.json())
            .then((result) => {
                if (result.length === 0) {
                    setSkills(null);
                    return;
                }
                setSkills(result);
            })
            .catch((error) => console.log('error', error));
    }, [roleId]);

    return (
        <PageWithNavBar homeLink="/roles">
            {typeof roleId === 'string' ? (
                <Page.Content>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                        }}
                    >
                        <h2>Skills for Role {roleId}</h2>
                        <EnrollDrawer
                            selectedCoursesBySkill={selectedCoursesBySkill}
                        />
                    </div>
                    <Spacer h={2} />
                    {skills && skills.length !== 0 && (
                        <Grid.Container gap={1.5} style={{ display: 'block' }}>
                            {skills.map((skill) => (
                                <SkillCard
                                    skill={skill}
                                    key={skill.id}
                                    selectedCoursesBySkill={
                                        selectedCoursesBySkill
                                    }
                                    setSelectedCoursesBySkill={
                                        setSelectedCoursesBySkill
                                    }
                                />
                            ))}
                        </Grid.Container>
                    )}
                    {skills === null && (
                        <Note type="error">
                            There are no skills assigned to this role yet.
                        </Note>
                    )}
                </Page.Content>
            ) : (
                <Text>Invalid role</Text>
            )}
        </PageWithNavBar>
    );
};

// Sub-Components

interface SkillCard {
    skill: Skill;
    selectedCoursesBySkill: CoursesBySkill;
    setSelectedCoursesBySkill: Dispatch<SetStateAction<CoursesBySkill>>;
}

const SkillCard = ({
    skill,
    selectedCoursesBySkill,
    setSelectedCoursesBySkill,
}: SkillCard) => {
    const [isChecked, setIsChecked] = useState(false);
    const [coursesBySkill, setCoursesBySkill] = useState<Course[] | null>();
    const fetchCoursesBySkill = useFetchCoursesBySkill({
        setCoursesBySkill,
        skillId: skill.id,
    });

    const handler = (selectedCourseIds: string[]) => {
        if (coursesBySkill == null) return;

        if (selectedCourseIds.length === 0) {
            console.log('LENGTH OF 0');
            setSelectedCoursesBySkill((curr) => {
                curr.delete(skill);
                return curr;
            });
            return;
        }

        const selectedCourses: Course[] = [];
        selectedCourseIds.forEach((courseId) => {
            const course = coursesBySkill.find((course) => {
                return course.id === courseId;
            });
            if (course != null) selectedCourses.push(course);
        });
        setSelectedCoursesBySkill((curr) => curr.set(skill, selectedCourses));
    };

    return (
        <>
            <Card width="400px">
                <Card.Content
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Text b my={0}>
                        {skill.name}
                    </Text>
                    <Checkbox
                        checked={isChecked}
                        type="success"
                        scale={2.3}
                        onChange={(e) => {
                            setIsChecked(e.target.checked);
                            if (
                                e.target.checked === true &&
                                coursesBySkill === undefined
                            ) {
                                fetchCoursesBySkill();
                            }
                        }}
                    />
                </Card.Content>
                <Divider h="1px" my={0} />
                {isChecked && (
                    <Card.Content style={{ display: 'block' }}>
                        {coursesBySkill && (
                            <Checkbox.Group value={[]} onChange={handler}>
                                {coursesBySkill &&
                                    coursesBySkill.map((course) => (
                                        <CourseCheckbox
                                            course={course}
                                            key={course.id}
                                        />
                                    ))}
                            </Checkbox.Group>
                        )}
                        {coursesBySkill === null && (
                            <Note type="warning">
                                No courses are assigned to this skill yet.
                            </Note>
                        )}
                    </Card.Content>
                )}
            </Card>
            <Spacer height={1} />
        </>
    );
};

// Sub-components

interface CourseCheckboxProps {
    course: Course;
}

const CourseCheckbox = ({ course }: CourseCheckboxProps) => {
    const { setVisible, bindings } = useModal();

    const openModal = () => {
        setVisible(true);
    };

    return (
        <div style={{ marginBottom: '5px' }}>
            <Checkbox type="default" key={course.id} value={course.id}>
                <Text>
                    <Link href="#" color underline onClick={openModal}>
                        {course.name}
                    </Link>
                </Text>
            </Checkbox>

            <Modal {...bindings}>
                <Modal.Title>{course.name}</Modal.Title>
                <Modal.Subtitle>{course.id}</Modal.Subtitle>
                <Modal.Content>
                    <p>{course.description}</p>
                </Modal.Content>
                <Modal.Action passive onClick={() => setVisible(false)}>
                    Exit
                </Modal.Action>
            </Modal>
        </div>
    );
};

export default EnrollPage;
