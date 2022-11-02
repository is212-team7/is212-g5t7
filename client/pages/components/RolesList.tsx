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
import { Role } from '../api/roles';
import { Skill } from '../api/skills';
import useCustomToast from '../hooks/useCustomToast';
import useFetchAssignedSkills from '../hooks/useFetchAssignedSkills';
import useFetchRoles, { RoleForTable } from '../hooks/useFetchRoles';
import Loading from './Loading';
import CreateRoleModal from './modal/CreateRoleModal';
import UpdateRoleModal from './modal/UpdateRoleModal';

const RolesList: NextPage = () => {
    const [roles, setRoles] = useState<Role[] | null>();
    const fetchRoles = useFetchRoles({ setRoles });
    const {
        visible: isCreateModalVisible,
        setVisible: setCreateModalVisible,
        bindings: createModalBindings,
    } = useModal();

    useEffect(() => {
        fetchRoles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Page.Content>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h2>Roles</h2>
                <div style={{ display: 'flex' }}>
                    <Button
                        type="secondary"
                        onClick={() => setCreateModalVisible(true)}
                    >
                        Create role
                    </Button>
                </div>
            </div>

            <Spacer height={2} />

            {roles && <List roles={roles} fetchRoles={fetchRoles} />}
            {roles === null && (
                <Note type="warning">There are no roles in the database.</Note>
            )}
            {roles === undefined && <Loading />}

            {isCreateModalVisible && (
                <CreateRoleModal
                    setVisible={setCreateModalVisible}
                    bindings={createModalBindings}
                    fetchRoles={fetchRoles}
                />
            )}
        </Page.Content>
    );
};

// Sub-Components

interface ListProps {
    roles: Role[];
    fetchRoles: ReturnType<typeof useFetchRoles>;
}

const List = ({ roles, fetchRoles }: ListProps) => {
    const deletedToast = useCustomToast({
        message: 'Role is deleted',
        type: 'secondary',
    });

    // For Modal
    const [roleToUpdate, setRoleToUpdate] = useState<Role>();
    const {
        visible: isUpdateModalVisible,
        setVisible: setUpdateModalVisible,
        bindings: updateModalBindings,
    } = useModal();

    const [skills, setSkills] = useState<Skill[]>();

    const UpdateRoleSkillButton = (value: any, role: RoleForTable) => {
        const { visible, setVisible, bindings } = useModal();
        const [skillSelected, setSkillSelected] = useState<Skill[]>();
        const [isLoading, setIsLoading] = useState(false);

        const fetchAssignedSkills = useFetchAssignedSkills({
            setSkillSelected,
            roleId: role.id,
        });

        const updateSuccessToast = useCustomToast({
            message: 'Roles-Skills updated successfully.',
            type: 'success',
        });
        const updateFailToast = useCustomToast({
            message: 'Roles-Skills update has failed.',
            type: 'error',
        });

        const [updatedSkills, setUpdatedSkills] = useState<{
            toAssign: Set<Skill>;
            toDelete: Set<Skill>;
        }>({
            toAssign: new Set(),
            toDelete: new Set(),
        });

        const onClick = () => {
            setVisible(true);
        };

        const handler = (newSkillSelected: string[] | string) => {
            if (!Array.isArray(newSkillSelected) || skillSelected == null)
                return;

            const newSkills: Skill[] = newSkillSelected.map((skill) =>
                JSON.parse(skill)
            );

            const added = new Set(
                newSkills.filter(
                    (newSkills) =>
                        !new Set(skillSelected.map((skill) => skill.id)).has(
                            newSkills.id
                        )
                )
            );
            const removed = new Set(
                skillSelected.filter(
                    (skill) =>
                        !new Set(newSkills.map((newSkill) => newSkill.id)).has(
                            skill.id
                        )
                )
            );

            setUpdatedSkills({ toAssign: added, toDelete: removed });
        };

        const updateRoleSkillRelations = async () => {
            if (
                updatedSkills.toAssign.size === 0 &&
                updatedSkills.toDelete.size === 0
            )
                return true;

            setIsLoading(true);
            let isFailed = false;

            updatedSkills.toAssign.forEach(async (skill) => {
                try {
                    await fetch(
                        '/api/skills/' + skill.id + '/role/' + role.id,
                        {
                            method: 'POST',
                        }
                    );
                } catch (error) {
                    updateFailToast();
                    isFailed = true;
                }
            });

            updatedSkills.toDelete.forEach(async (skill) => {
                try {
                    await fetch(
                        '/api/skills/' + skill.id + '/role/' + role.id,
                        {
                            method: 'DELETE',
                        }
                    );
                } catch (error) {
                    updateFailToast();
                    isFailed = true;
                }
            });

            if (!isFailed) updateSuccessToast();
            await fetchAssignedSkills();
            setIsLoading(false);
            setVisible(false);
        };

        useEffect(() => {
            (async () => {
                // Get list of all skills
                const skills = await (await fetch('/api/skills')).json();
                setSkills(skills);
                await fetchAssignedSkills();
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
                    disabled={String(role.deleted) === 'true'}
                >
                    Skills
                </Button>

                <Modal {...bindings}>
                    <Modal.Title>Update Skills</Modal.Title>
                    <Modal.Subtitle>
                        Add or delete skills under {role.name}
                    </Modal.Subtitle>
                    {skillSelected != null ? (
                        <Modal.Content style={{ marginTop: '1em' }}>
                            {skills != null && (
                                <Select
                                    placeholder="Skills"
                                    multiple
                                    width="100%"
                                    initialValue={skillSelected?.map((skill) =>
                                        JSON.stringify(skill)
                                    )}
                                    onChange={handler}
                                >
                                    {skills.map((skill) => (
                                        <Select.Option
                                            value={JSON.stringify(skill)}
                                            key={skill.id}
                                        >
                                            {skill.id}: {skill.name}
                                        </Select.Option>
                                    ))}
                                </Select>
                            )}

                            <Spacer height={1.5} />
                            {updatedSkills.toAssign.size > 0 && (
                                <>
                                    <Tag type="lite">Assign to Role</Tag>
                                    <ul>
                                        {Array.from(updatedSkills.toAssign).map(
                                            (skillToAssign) => (
                                                <li
                                                    key={skillToAssign.id}
                                                    style={{
                                                        fontSize: '0.8em',
                                                    }}
                                                >
                                                    {skillToAssign.id}:{' '}
                                                    {skillToAssign.name}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </>
                            )}

                            <Spacer height={0.5} />
                            {updatedSkills.toDelete.size > 0 && (
                                <>
                                    <Tag type="lite">Delete from Role</Tag>
                                    <ul>
                                        {Array.from(updatedSkills.toDelete).map(
                                            (skillToDelete) => (
                                                <li
                                                    key={skillToDelete.id}
                                                    style={{
                                                        fontSize: '0.8em',
                                                    }}
                                                >
                                                    {skillToDelete.id}:{' '}
                                                    {skillToDelete.name}
                                                </li>
                                            )
                                        )}
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
                    {skillSelected != null && (
                        <Modal.Action
                            onClick={updateRoleSkillRelations}
                            loading={isLoading}
                        >
                            Submit
                        </Modal.Action>
                    )}
                </Modal>
            </>
        );
    };

    const UpdateRoleButton = (value: any, rowData: RoleForTable) => {
        const onClick = () => {
            setUpdateModalVisible(true);
            setRoleToUpdate(rowData);
            fetchRoles();
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

    const DeleteRoleButton = (
        value: any,
        rowData: RoleForTable,
        index: number
    ) => {
        const onClick = () => {
            fetch('/api/roles/' + rowData.id, { method: 'DELETE' }).then(
                (response) => {
                    deletedToast();
                    fetchRoles();
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
            <Table data={roles}>
                <Table.Column prop="name" label="name" />
                <Table.Column prop="description" label="description" />
                <Table.Column prop="deleted" label="deleted" />
                <Table.Column
                    prop="skills"
                    label="skills"
                    width={150}
                    render={UpdateRoleSkillButton}
                />
                <Table.Column
                    prop="update"
                    label="update"
                    width={150}
                    render={UpdateRoleButton}
                />
                <Table.Column
                    prop="delete"
                    label="delete"
                    width={150}
                    render={DeleteRoleButton}
                />
            </Table>

            {isUpdateModalVisible && roleToUpdate && (
                <UpdateRoleModal
                    setVisible={setUpdateModalVisible}
                    bindings={updateModalBindings}
                    roleToUpdate={roleToUpdate}
                    fetchRoles={fetchRoles}
                />
            )}
        </>
    );
};

export default RolesList;
