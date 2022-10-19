import {
    Button,
    Input,
    Modal,
    Page,
    Spacer,
    Table,
    useModal,
} from '@geist-ui/core';
import type { NextPage } from 'next';
import { useState } from 'react';
import { Role, roles } from '../../database/roles';

const emptyRow = {
    id: '',
    label: '',
    description: '',
};

const UpdateRolePage: NextPage = () => {
    const [data, setData] = useState<Role[]>(roles);
    // For Modal
    const [updatedValues, setUpdatedValues] = useState<Role>(emptyRow);
    const [roleIDToUpdate, setRoleIDToUpdate] = useState('');
    const { visible, setVisible, bindings } = useModal();

    const showUpdateRoleModal = (value: any, rowData: any) => {
        const updateHandler = () => {
            setVisible(true);
            // naive way of identifying role since there's no ID on client side
            setRoleIDToUpdate(rowData.id);
        };

        return (
            <Button
                type="secondary"
                auto
                scale={1 / 3}
                font="12px"
                onClick={updateHandler}
            >
                Update
            </Button>
        );
    };

    const updateRole = (
        roleIDToUpdate: string,
        newId: string,
        newRoleLabel: string,
        newDescription: string
    ) => {
        setData((last) =>
            last.map((row) => {
                if (row.id !== roleIDToUpdate) return row;
                return {
                    id: newId,
                    label: newRoleLabel,
                    description: newDescription,
                };
            })
        );
    };

    const deleteRole = (_1: any, _2: any, index: number) => {
        const removeHandler = () => {
            setData((last) =>
                last.filter((_, dataIndex) => dataIndex !== index)
            );
        };
        return (
            <Button
                type="error"
                auto
                scale={1 / 3}
                font="12px"
                onClick={removeHandler}
            >
                Delete
            </Button>
        );
    };

    const resetModal = () => {
        setVisible(false);
        setRoleIDToUpdate('');
        setUpdatedValues(emptyRow);
    };

    return (
        <Page>
            <Page.Content>
                <h2>Edit Roles</h2>
                <Table data={data}>
                    <Table.Column prop="id" label="ID" />
                    <Table.Column prop="label" label="role" />
                    <Table.Column prop="description" label="description" />
                    <Table.Column
                        prop="update"
                        label="update"
                        width={150}
                        render={showUpdateRoleModal}
                    />
                    <Table.Column
                        prop="delete"
                        label="delete"
                        width={150}
                        render={deleteRole}
                    />
                </Table>

                {/* MODAL */}
                <Modal {...bindings}>
                    <Modal.Title>Update role</Modal.Title>
                    <Modal.Content>
                        <Input
                            label="Role"
                            placeholder="Role"
                            value={updatedValues.label}
                            onChange={(val) =>
                                setUpdatedValues((curr) => ({
                                    ...curr,
                                    label: val.target.value,
                                }))
                            }
                        />
                        <Spacer h={0.5} />
                        <Input
                            label="Description"
                            placeholder="Description"
                            value={updatedValues.description}
                            onChange={(val) =>
                                setUpdatedValues((curr) => ({
                                    ...curr,
                                    description: val.target.value,
                                }))
                            }
                        />
                    </Modal.Content>
                    <Modal.Action passive onClick={resetModal}>
                        Cancel
                    </Modal.Action>
                    <Modal.Action
                        onClick={() => {
                            updateRole(
                                roleIDToUpdate,
                                updatedValues.id,
                                updatedValues.label,
                                updatedValues.description
                            );
                            resetModal();
                        }}
                    >
                        Submit
                    </Modal.Action>
                </Modal>
            </Page.Content>
        </Page>
    );
};

export default UpdateRolePage;
