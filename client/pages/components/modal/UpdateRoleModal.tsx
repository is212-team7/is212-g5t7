import { ModalHooksBindings } from '@geist-ui/core/esm/use-modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { Role } from '../../api/roles';
import useCustomToast from '../../hooks/useCustomToast';
import { useFetchRoles } from '../../hooks/useFetchRoles';
import RoleModal, { PartialRole } from './RoleModal';

interface UpdateRoleModalProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    roleToUpdate: Role;
    bindings: ModalHooksBindings;
    fetchRoles: ReturnType<typeof useFetchRoles>;
}

const UpdateRoleModal = ({
    setVisible,
    roleToUpdate,
    bindings,
    fetchRoles,
}: UpdateRoleModalProps) => {
    const [currRole, setCurrRole] = useState<PartialRole>(roleToUpdate);
    const updatedToast = useCustomToast({
        message: 'Role is updated.',
        type: 'success',
    });

    const submitUpdate = () => {
        const body: PartialRole = {
            name: currRole.name,
            description: currRole.description,
        };

        fetch('/api/roles/' + roleToUpdate.id, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            setVisible(false);
            updatedToast();
            fetchRoles();
        });
        setVisible(false);
    };

    return (
        <RoleModal
            setVisible={setVisible}
            bindings={bindings}
            handler={submitUpdate}
            currRole={currRole}
            setCurrRole={setCurrRole}
            title="Update Role"
        />
    );
};

export default UpdateRoleModal;
