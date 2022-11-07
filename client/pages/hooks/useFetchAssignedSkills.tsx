import { Dispatch, SetStateAction } from 'react';
import { Role } from '../api/roles';
import { Skill } from '../api/skills';

interface useFetchAssignedSkillsProps {
    setSkillSelected: Dispatch<SetStateAction<Skill[] | undefined>>;
    roleId: Role['id'];
}

const useFetchAssignedSkills = ({
    setSkillSelected,
    roleId,
}: useFetchAssignedSkillsProps) => {
    return async () => {
        // Get already-assigned roles to this skill
        const assignedSkills: Skill[] = await (
            await fetch('/api/skills/role/' + roleId)
        ).json();

        setSkillSelected(assignedSkills);
    };
};

export default useFetchAssignedSkills;
