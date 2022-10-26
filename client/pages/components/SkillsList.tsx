import { Button, Note, Page, Spacer, Table, useModal } from '@geist-ui/core';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Skill } from '../api/skills';
import useCustomToast from '../hooks/useCustomToast';
import useFetchSkills, { SkillForTable } from '../hooks/useFetchSkills';
import CreateSkillModal from './modal/CreateSkillModal';
import UpdateSkillModal from './modal/UpdateSkillModal';

const SkillsList: NextPage = () => {
    const [skills, setSkills] = useState<SkillForTable[]>();
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
            {skills == null && (
                <Note type="warning">There are no skills in the database.</Note>
            )}
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
    const [skillToUpdate, setSkillToUpdate] = useState<Skill>();
    const {
        visible: isUpdateModalVisible,
        setVisible: setUpdateModalVisible,
        bindings: updateModalBindings,
    } = useModal();

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
