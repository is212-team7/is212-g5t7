import { useToasts } from '@geist-ui/core';
import { ToastTypes } from '@geist-ui/core/esm/use-toasts';

interface useCustomToastProps {
    message: string;
    type: ToastTypes;
}

const useCustomToast = ({ message, type }: useCustomToastProps) => {
    const { setToast } = useToasts();
    const click = () =>
        setToast({
            text: <p>{message}</p>,
            delay: 4000,
            type,
        });

    return click;
};

export default useCustomToast;
