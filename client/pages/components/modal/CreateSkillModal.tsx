import { ModalHooksBindings } from '@geist-ui/core/esm/use-modal';
import { Dispatch, SetStateAction, useState } from 'react';
import useCustomToast from '../../hooks/useCustomToast';
import { useFetchSkills } from '../../hooks/useFetchSkills';
import SkillModal, { PartialSkill } from './SkillModal';

interface CreateSkillModalProps {
    setVisible: Dispatch<SetStateAction<boolean>>;
    bindings: ModalHooksBindings;
    fetchSkills: ReturnType<typeof useFetchSkills>;
}

const CreateSkillModal = ({
    setVisible,
    bindings,
    fetchSkills,
}: CreateSkillModalProps) => {
    const [currSkill, setCurrSkill] = useState<PartialSkill>({
        name: '',
        category: '',
        description: '',
    });
    const createdToast = useCustomToast({
        message: 'Skill is created.',
        type: 'success',
    });

    const submitCreate = () => {
        fetch('/api/skills/', {
            method: 'POST',
            body: JSON.stringify(currSkill),
            headers: { 'Content-Type': 'application/json' },
        }).then((result) => {
            setVisible(false);
            createdToast();
            fetchSkills();
        });
        setVisible(false);
    };

    return (
        <SkillModal
            setVisible={setVisible}
            bindings={bindings}
            handler={submitCreate}
            currSkill={currSkill}
            setCurrSkill={setCurrSkill}
            title="Create Skill"
        />
    );
};

export default CreateSkillModal;
