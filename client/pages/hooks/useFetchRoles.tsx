import { Dispatch, SetStateAction } from 'react';
import { Role } from '../api/roles';

export interface RoleForTable extends Role {
    delete: string;
    update: string;
}

interface useFetchRolesProp {
    setRoles: Dispatch<SetStateAction<Role[] | undefined>>;
}

export const useFetchRoles =
    ({ setRoles }: useFetchRolesProp) =>
    () =>
        fetch('/api/roles', { method: 'GET' })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                if (Array.isArray(result))
                    setRoles(
                        result.map((row) => ({
                            ...row,
                            deleted: String(row.deleted),
                            delete: '',
                            update: '',
                        }))
                    );
            })
            .catch((e) => console.log(e));

export default useFetchRoles;
