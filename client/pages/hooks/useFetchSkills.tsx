import { Dispatch, SetStateAction } from 'react';
import { Skill } from '../api/skills';

export interface SkillForTable extends Skill {
    courses: string;
    delete: string;
    update: string;
}

interface useFetchSkillsProp {
    setSkills: Dispatch<SetStateAction<SkillForTable[] | null | undefined>>;
}

const useFetchSkills =
    ({ setSkills }: useFetchSkillsProp) =>
    () =>
        fetch('/api/skills', { method: 'GET' })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                if (Array.isArray(result)) {
                    if (result.length === 0) {
                        setSkills(null);
                        return;
                    }
                    setSkills(
                        result.map((row) => ({
                            ...row,
                            deleted: String(row.deleted),
                            courses: '',
                            delete: '',
                            update: '',
                        }))
                    );
                }
            })
            .catch((e) => console.log(e));

export default useFetchSkills;
