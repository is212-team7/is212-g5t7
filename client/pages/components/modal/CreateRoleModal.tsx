import { ModalHooksBindings } from '@geist-ui/core/esm/use-modal';
import { Dispatch, SetStateAction, useState } from 'react';
import useCustomToast from '../../hooks/useCustomToast';
import { useFetchRoles } from '../../hooks/useFetchRoles';
import RoleModal, { PartialRole } from './RoleModal';

interface CreateRoleModalProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    bindings: ModalHooksBindings;
    fetchRoles: ReturnType<typeof useFetchRoles>;
}

const CreateRoleModal = ({
    setVisible,
    bindings,
    fetchRoles,
}: CreateRoleModalProps) => {
    const [currRole, setCurrRole] = useState<PartialRole>({
        name: '',
        description: '',
    });
    const createdToast = useCustomToast({
        message: 'Role is created.',
        type: 'success',
    });

    const submitCreate = () => {
        fetch('/api/roles/', {
            method: 'POST',
            body: JSON.stringify(currRole),
            headers: { 'Content-Type': 'application/json' },
        }).then((result) => {
            setVisible(false);
            createdToast();
            fetchRoles();
        });
        setVisible(false);
    };

    return (
        <RoleModal
            setVisible={setVisible}
            bindings={bindings}
            handler={submitCreate}
            currRole={currRole}
            setCurrRole={setCurrRole}
            title="Create Role"
        />
    );
};

export default CreateRoleModal;
