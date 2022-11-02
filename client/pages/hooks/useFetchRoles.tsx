import { Dispatch, SetStateAction } from 'react';
import { Role } from '../api/roles';

export interface RoleForTable extends Role {
    skills: string;
    delete: string;
    update: string;
}

interface useFetchRolesProp {
    setRoles: Dispatch<SetStateAction<Role[] | null | undefined>>;
}

const useFetchRoles =
    ({ setRoles }: useFetchRolesProp) =>
    () =>
        fetch('/api/roles', { method: 'GET' })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                if (Array.isArray(result)) {
                    if (result.length === 0) {
                        setRoles(null);
                        return;
                    }
                    setRoles(
                        result.map((row) => ({
                            ...row,
                            deleted: String(row.deleted),
                            skills: '',
                            delete: '',
                            update: '',
                        }))
                    );
                }
            })
            .catch((e) => console.log(e));

export default useFetchRoles;
