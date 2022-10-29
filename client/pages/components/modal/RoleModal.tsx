import { Input, Modal, Spacer } from '@geist-ui/core';
import { ModalHooksBindings } from '@geist-ui/core/esm/use-modal';
import { Dispatch, SetStateAction } from 'react';
import { Role } from '../../api/roles';

export type PartialRole = Pick<Role, 'name' | 'description'>;

interface RoleModalProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    bindings: ModalHooksBindings;
    handler: () => void;
    currRole: PartialRole;
    setCurrRole: Dispatch<SetStateAction<PartialRole>>;
    title: string;
}

const RoleModal = ({
    setVisible,
    bindings,
    handler,
    currRole,
    setCurrRole,
    title,
}: RoleModalProps) => {
    return (
        <Modal
            {...bindings}
            visible={true}
            style={{ justifyContent: 'center' }}
        >
            <Modal.Title>{title}</Modal.Title>
            {currRole && (
                <Modal.Content>
                    <Spacer h={0.5} />
                    <Input
                        label="Role"
                        placeholder="Role"
                        value={currRole.name}
                        width={23}
                        onChange={(val) =>
                            setCurrRole((curr) => ({
                                ...curr,
                                name: val.target.value,
                            }))
                        }
                    />
                    <Spacer h={0.5} />
                    <Input
                        label="Description"
                        placeholder="Description"
                        value={currRole.description}
                        width={23}
                        onChange={(val) =>
                            setCurrRole((curr) => ({
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

export default RoleModal;
