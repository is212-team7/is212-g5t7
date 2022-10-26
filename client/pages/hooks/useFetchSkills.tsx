import { Dispatch, SetStateAction } from 'react';
import { Skill } from '../api/skills';

export interface SkillForTable extends Skill {
    delete: string;
    update: string;
}

interface useFetchSkillsProp {
    setSkills: Dispatch<SetStateAction<SkillForTable[] | undefined>>;
}

const useFetchSkills =
    ({ setSkills }: useFetchSkillsProp) =>
    () =>
        fetch('/api/skills', { method: 'GET' })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                if (Array.isArray(result))
                    setSkills(
                        result.map((row) => ({
                            ...row,
                            deleted: String(row.deleted),
                            delete: '',
                            update: '',
                        }))
                    );
            })
            .catch((e) => console.log(e));

export default useFetchSkills;
