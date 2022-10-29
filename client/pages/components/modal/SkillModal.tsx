import { Input, Modal, Spacer } from '@geist-ui/core';
import { ModalHooksBindings } from '@geist-ui/core/esm/use-modal';
import { Dispatch, SetStateAction } from 'react';
import { Skill } from '../../api/skills';

export type PartialSkill = Pick<Skill, 'name' | 'category' | 'description'>;

interface SkillModalProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    bindings: ModalHooksBindings;
    handler: () => void;
    currSkill: PartialSkill;
    setCurrSkill: Dispatch<SetStateAction<PartialSkill>>;
    title: string;
}

const SkillModal = ({
    setVisible,
    bindings,
    handler,
    currSkill,
    setCurrSkill,
    title,
}: SkillModalProps) => {
    return (
        <Modal
            {...bindings}
            visible={true}
            style={{ justifyContent: 'center' }}
        >
            <Modal.Title>{title}</Modal.Title>
            {currSkill && (
                <Modal.Content>
                    <Input
                        label="Category"
                        placeholder="Category"
                        value={currSkill.category}
                        width={23}
                        onChange={(val) =>
                            setCurrSkill((curr) => ({
                                ...curr,
                                category: val.target.value,
                            }))
                        }
                    />
                    <Spacer h={0.5} />
                    <Input
                        label="Skill"
                        placeholder="Skill"
                        value={currSkill.name}
                        width={23}
                        onChange={(val) =>
                            setCurrSkill((curr) => ({
                                ...curr,
                                name: val.target.value,
                            }))
                        }
                    />
                    <Spacer h={0.5} />
                    <Input
                        label="Description"
                        placeholder="Description"
                        value={currSkill.description}
                        width={23}
                        onChange={(val) =>
                            setCurrSkill((curr) => ({
                                ...curr,
                                description: val.target.value,
                            }))
                        }
                    />
                </Modal.Content>
            )}
            <Modal.Action passive onClick={() => setVisible(false)}>
                Cancel
            </Modal.Action>
            <Modal.Action onClick={handler}>Submit</Modal.Action>
        </Modal>
    );
};

export default SkillModal;
