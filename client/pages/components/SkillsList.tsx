import {
    Button,
    Modal,
    Note,
    Page,
    Select,
    Spacer,
    Table,
    Tag,
    useModal,
} from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { Course } from '../api/courses';
import { Skill } from '../api/skills';
import useCustomToast from '../hooks/useCustomToast';
import useFetchAssignedCourses from '../hooks/useFetchAssignedCourses';
import useFetchSkills, { SkillForTable } from '../hooks/useFetchSkills';
import Loading from './Loading';
import CreateSkillModal from './modal/CreateSkillModal';
import UpdateSkillModal from './modal/UpdateSkillModal';

const SkillsList: NextPage = () => {
    const [skills, setSkills] = useState<SkillForTable[] | null>();
    const fetchSkills = useFetchSkills({ setSkills });
    const {
        visible: isCreateModalVisible,
        setVisible: setCreateModalVisible,
        bindings: createModalBindings,
    } = useModal();

    useEffect(() => {
        fetchSkills();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Page.Content>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Skills</h2>
                <Button
                    type="secondary"
                    onClick={() => setCreateModalVisible(true)}
                >
                    Create skill
                </Button>
            </div>

            <Spacer height={2} />

            {skills && <List skills={skills} fetchSkills={fetchSkills} />}
            {skills === null && (
                <Note type="warning">There are no skills in the database.</Note>
            )}
            {skills === undefined && <Loading />}

            {isCreateModalVisible && (
                <CreateSkillModal
                    setVisible={setCreateModalVisible}
                    bindings={createModalBindings}
                    fetchSkills={fetchSkills}
                />
            )}
        </Page.Content>
    );
};

// Sub-Components

interface ListProps {
    skills: SkillForTable[];
    fetchSkills: ReturnType<typeof useFetchSkills>;
}

const List = ({ skills, fetchSkills }: ListProps) => {
    const deletedToast = useCustomToast({
        message: 'Skill is deleted',
        type: 'secondary',
    });

    // For Modal
    const [courses, setCourses] = useState<Course[]>();
    const [skillToUpdate, setSkillToUpdate] = useState<Skill>();
    const {
        visible: isUpdateModalVisible,
        setVisible: setUpdateModalVisible,
        bindings: updateModalBindings,
    } = useModal();

    const UpdateSkillCourseButton = (value: any, skill: SkillForTable) => {
        const { visible, setVisible, bindings } = useModal();
        const [courseSelected, setCourseSelected] = useState<Course[]>();
        const [isLoading, setIsLoading] = useState(false);

        const fetchAssignedCourses = useFetchAssignedCourses({
            setCourseSelected,
            skillId: skill.id,
        });

        const updateSuccessToast = useCustomToast({
            message: 'Skills-Courses updated successfully.',
            type: 'success',
        });
        const updateFailToast = useCustomToast({
            message: 'Skills-Courses update has failed.',
            type: 'error',
        });

        const [updatedCourses, setUpdatedCourses] = useState<{
            toAssign: Set<Course>;
            toDelete: Set<Course>;
        }>({
            toAssign: new Set(),
            toDelete: new Set(),
        });

        const onClick = () => {
            setVisible(true);
        };

        const handler = (newCourseSelected: string[] | string) => {
            if (!Array.isArray(newCourseSelected) || courseSelected == null)
                return;

            const newCourses: Course[] = newCourseSelected.map((course) =>
                JSON.parse(course)
            );

            const added = new Set(
                newCourses.filter(
                    (newCourse) =>
                        !new Set(courseSelected.map((course) => course.id)).has(
                            newCourse.id
                        )
                )
            );
            const removed = new Set(
                courseSelected.filter(
                    (course) =>
                        !new Set(
                            newCourses.map((newCourse) => newCourse.id)
                        ).has(course.id)
                )
            );

            setUpdatedCourses({ toAssign: added, toDelete: removed });
        };

        const updateSkillCourseRelations = async () => {
            if (
                updatedCourses.toAssign.size === 0 &&
                updatedCourses.toDelete.size === 0
            )
                return true;

            setIsLoading(true);
            let isFailed = false;

            updatedCourses.toAssign.forEach(async (course) => {
                try {
                    const res = await fetch(
                        '/api/courses/' + course.id + '/skill/' + skill.id,
                        {
                            method: 'POST',
                        }
                    );
                } catch (error) {
                    updateFailToast();
                    isFailed = true;
                }
            });

            updatedCourses.toDelete.forEach(async (course) => {
                try {
                    await fetch(
                        '/api/courses/' + course.id + '/skill/' + skill.id,
                        {
                            method: 'DELETE',
                        }
                    );
                    console.log({
                        deleteEndpoint:
                            '/api/courses/' + course.id + '/skill/' + skill.id,
                    });
                } catch (error) {
                    updateFailToast();
                    isFailed = true;
                }
            });

            if (!isFailed) updateSuccessToast();
            await fetchAssignedCourses();
            setIsLoading(false);
            setVisible(false);
        };

        useEffect(() => {
            (async () => {
                // Get list of all courses
                const courses = await (await fetch('/api/courses')).json();
                setCourses(courses);
                await fetchAssignedCourses();
            })();
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, []);

        return (
            <>
                <Button
                    type="success"
                    auto
                    scale={1 / 3}
                    font="12px"
                    onClick={onClick}
                    disabled={String(skill.deleted) === 'true'}
                >
                    Courses
                </Button>

                <Modal {...bindings}>
                    <Modal.Title>Update Courses</Modal.Title>
                    <Modal.Subtitle>
                        Add or delete courses under {skill.name}
                    </Modal.Subtitle>
                    {courseSelected != null ? (
                        <Modal.Content style={{ marginTop: '1em' }}>
                            {courses != null && (
                                <Select
                                    placeholder="Courses"
                                    multiple
                                    width="100%"
                                    initialValue={courseSelected?.map(
                                        (course) => JSON.stringify(course)
                                    )}
                                    onChange={handler}
                                >
                                    {courses.map((course) => (
                                        <Select.Option
                                            value={JSON.stringify(course)}
                                            key={course.id}
                                        >
                                            {course.id}: {course.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}

                            <Spacer height={1.5} />
                            {updatedCourses.toAssign.size > 0 && (
                                <>
                                    <Tag type="lite">Assign to Skill</Tag>
                                    <ul>
                                        {Array.from(
                                            updatedCourses.toAssign
                                        ).map((courseToAssign) => (
                                            <li
                                                key={courseToAssign.id}
                                                style={{ fontSize: '0.8em' }}
                                            >
                                                {courseToAssign.id}:{' '}
                                                {courseToAssign.name}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}

                            <Spacer height={0.5} />
                            {updatedCourses.toDelete.size > 0 && (
                                <>
                                    <Tag type="lite">Delete from Skill</Tag>
                                    <ul>
                                        {Array.from(
                                            updatedCourses.toDelete
                                        ).map((courseToDelete) => (
                                            <li
                                                key={courseToDelete.id}
                                                style={{ fontSize: '0.8em' }}
                                            >
                                                {courseToDelete.id}:{' '}
                                                {courseToDelete.name}
                                            </li>
                                        ))}
                                    </ul>
                                </>
                            )}
                        </Modal.Content>
                    ) : (
                        <div>
                            <Spacer height={1} />
                            <Loading />
                            <Spacer height={1} />
                        </div>
                    )}
                    <Modal.Action passive onClick={() => setVisible(false)}>
                        Cancel
                    </Modal.Action>
                    {courseSelected != null && (
                        <Modal.Action
                            onClick={updateSkillCourseRelations}
                            loading={isLoading}
                        >
                            Submit
                        </Modal.Action>
                    )}
                </Modal>
            </>
        );
    };

    const UpdateSkillButton = (value: any, rowData: SkillForTable) => {
        const onClick = () => {
            setUpdateModalVisible(true);
            setSkillToUpdate(rowData);
            fetchSkills();
        };

        return (
            <Button
                type="secondary"
                auto
                scale={1 / 3}
                font="12px"
                onClick={onClick}
                disabled={String(rowData.deleted) === 'true'}
            >
                Update
            </Button>
        );
    };

    const DeleteSkillButton = (
        value: any,
        rowData: SkillForTable,
        index: number
    ) => {
        const onClick = () => {
            fetch('/api/skills/' + rowData.id, { method: 'DELETE' }).then(
                (response) => {
                    deletedToast();
                    fetchSkills();
                }
            );
        };

        return (
            <Button
                type="error"
                auto
                scale={1 / 3}
                font="12px"
                onClick={onClick}
                disabled={String(rowData.deleted) === 'true'}
            >
                Delete
            </Button>
        );
    };

    return (
        <>
            <Table data={skills}>
                <Table.Column prop="category" label="category" />
                <Table.Column prop="name" label="name" />
                <Table.Column prop="description" label="description" />
                <Table.Column prop="deleted" label="deleted" />
                <Table.Column
                    prop="courses"
                    label="courses"
                    width={150}
                    render={UpdateSkillCourseButton}
                />
                <Table.Column
                    prop="update"
                    label="update"
                    width={150}
                    render={UpdateSkillButton}
                />
                <Table.Column
                    prop="delete"
                    label="delete"
                    width={150}
                    render={DeleteSkillButton}
                />
            </Table>

            {isUpdateModalVisible && skillToUpdate && (
                <UpdateSkillModal
                    setVisible={setUpdateModalVisible}
                    bindings={updateModalBindings}
                    skillToUpdate={skillToUpdate}
                    fetchSkills={fetchSkills}
                />
            )}
        </>
    );
};

export default SkillsList;
