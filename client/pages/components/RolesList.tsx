import { Button, Note, Page, Spacer, Table, useModal } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Role } from '../api/roles';
import useCustomToast from '../hooks/useCustomToast';
import { RoleForTable, useFetchRoles } from '../hooks/useFetchRoles';
import CreateRoleModal from './modal/CreateRoleModal';
import UpdateRoleModal from './modal/UpdateRoleModal';

const RolesList: NextPage = () => {
    const [roles, setRoles] = useState<Role[]>();
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
                    <Spacer width={1} />
                    <Button type="secondary" onClick={() => {}}>
                        Assign skills to role
                    </Button>
                </div>
            </div>

            <Spacer height={2} />

            {roles && <List roles={roles} fetchRoles={fetchRoles} />}
            {roles == null && (
                <Note type="warning">There are no roles in the database.</Note>
            )}
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
                <Table.Column prop="skills" label="skills" />
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
