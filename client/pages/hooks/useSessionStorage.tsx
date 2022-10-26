import { useEffect, useState } from 'react';
import { Staff } from '../api/staffs';

const useSessionStorage = (): Staff | undefined => {
    const [staff, setStaff] = useState<Staff>();

    useEffect(() => {
        const value = sessionStorage.getItem('user');
        value && setStaff(JSON.parse(value));
    }, []);

    return staff;
};

export default useSessionStorage;
