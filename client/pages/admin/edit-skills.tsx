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
import { skillCategories, SkillCategory } from '../../database/skills';

interface RowData {
    category: string;
    skill: string;
    description: string;
}

const emptyRowData = {
    category: '',
    skill: '',
    description: '',
};

const UpdateSkillPage: NextPage = () => {
    const [data, setData] = useState(parseSkillCategories(skillCategories));

    // For Modal
    const [updatedValues, setUpdatedValues] = useState<RowData>(emptyRowData);
    const [skillToUpdate, setSkillToUpdate] = useState('');
    const { visible, setVisible, bindings } = useModal();

    const showUpdateSkillModal = (value: any, rowData: any) => {
        const updateHandler = () => {
            setVisible(true);
            // naive way of identifying skill since there's no ID on client side
            setSkillToUpdate(rowData.skill);
        };
        console.log({ value, rowData });

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

    const updateSkill = (
        originalSkillLabel: string,
        category: string,
        newSkillLabel: string,
        newDescription: string
    ) => {
        setData((last) =>
            last.map((row) => {
                if (row.skill !== originalSkillLabel) return row;
                return {
                    category,
                    skill: newSkillLabel,
                    description: newDescription,
                };
            })
        );
    };

    const deleteSkill = (_1: any, _2: any, index: number) => {
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
        setSkillToUpdate('');
        setUpdatedValues(emptyRowData);
    };

    return (
        <Page>
            <Page.Content>
                <h2>Update Skill</h2>
                <Table data={data}>
                    <Table.Column prop="category" label="category" />
                    <Table.Column prop="skill" label="skill" />
                    <Table.Column prop="description" label="description" />
                    <Table.Column
                        prop="update"
                        label="update"
                        width={150}
                        render={showUpdateSkillModal}
                    />
                    <Table.Column
                        prop="delete"
                        label="delete"
                        width={150}
                        render={deleteSkill}
                    />
                </Table>

                {/* MODAL */}
                <Modal {...bindings}>
                    <Modal.Title>Update skill</Modal.Title>
                    <Modal.Content>
                        <Input
                            label="Category"
                            placeholder="Category"
                            value={updatedValues.category}
                            onChange={(val) =>
                                setUpdatedValues((curr) => ({
                                    ...curr,
                                    category: val.target.value,
                                }))
                            }
                        />
                        <Spacer h={0.5} />
                        <Input
                            label="Skill"
                            placeholder="Skill"
                            value={updatedValues.skill}
                            onChange={(val) =>
                                setUpdatedValues((curr) => ({
                                    ...curr,
                                    skill: val.target.value,
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
                            updateSkill(
                                skillToUpdate,
                                updatedValues.category,
                                updatedValues.skill,
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

// HELPERS

function parseSkillCategories(skillCategories: SkillCategory) {
    const categories = Object.keys(skillCategories);
    let rows = [];

    for (let category of categories) {
        for (let skill of skillCategories[category]) {
            rows.push({
                category,
                skill: skill.label,
                description: skill.description,
            });
        }
    }

    return rows;
}

export default UpdateSkillPage;
