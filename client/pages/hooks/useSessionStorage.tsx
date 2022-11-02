import { useEffect, useState } from 'react';
import { Staff } from '../api/staffs';

const useSessionStorage = (): Staff | undefined => {
    const [staff, setStaff] = useState<Staff>();

    useEffect(() => {
        const value: Staff =
            'getObject' in Storage.prototype
                ? sessionStorage.getObject('user')
                : JSON.stringify(sessionStorage.getItem('user'));
        value && setStaff(value);
    }, []);

    return staff;
};

export default useSessionStorage;
