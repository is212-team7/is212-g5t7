import { ModalHooksBindings } from '@geist-ui/core/esm/use-modal';
import { Dispatch, SetStateAction, useState } from 'react';
import { Skill } from '../../api/skills';
import useCustomToast from '../../hooks/useCustomToast';
import useFetchSkills from '../../hooks/useFetchSkills';
import SkillModal, { PartialSkill } from './SkillModal';

interface UpdateSkillModalProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    skillToUpdate: Skill;
    bindings: ModalHooksBindings;
    fetchSkills: ReturnType<typeof useFetchSkills>;
}

const UpdateSkillModal = ({
    setVisible,
    skillToUpdate,
    bindings,
    fetchSkills,
}: UpdateSkillModalProps) => {
    const [currSkill, setCurrSkill] = useState<PartialSkill>(skillToUpdate);
    const updatedToast = useCustomToast({
        message: 'Skill is updated.',
        type: 'success',
    });

    const submitUpdate = () => {
        const body: Skill = {
            id: skillToUpdate.id,
            category: currSkill.category,
            name: currSkill.name,
            description: currSkill.description,
            deleted: skillToUpdate.deleted,
        };

        fetch('/api/skills/' + skillToUpdate.id, {
            method: 'PUT',
            body: JSON.stringify(body),
            headers: { 'Content-Type': 'application/json' },
        }).then(() => {
            setVisible(false);
            updatedToast();
            fetchSkills();
        });
        setVisible(false);
    };

    return (
        <SkillModal
            setVisible={setVisible}
            bindings={bindings}
            handler={submitUpdate}
            currSkill={currSkill}
            setCurrSkill={setCurrSkill}
            title="Update Skill"
        />
    );
};

export default UpdateSkillModal;
