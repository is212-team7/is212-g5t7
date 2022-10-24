import { Button, useToasts } from '@geist-ui/core';
import { useState } from 'react';

interface Toast {
    toastText: string;
    buttonText: string;
    onClick?: () => boolean;
}

const ButtonWithToast = ({ toastText, buttonText, onClick }: Toast) => {
    const { setToast } = useToasts();
    const [isLoading, setIsLoading] = useState(false);

    const click = () => {
        if (onClick != null) {
            const result = onClick();
            if (result) {
                setIsLoading(true);
                setToast({ text: toastText, delay: 5000 });
            }
        }
    };

    return (
        <Button type="secondary" auto onClick={click} loading={isLoading}>
            {buttonText}
        </Button>
    );
};

export default ButtonWithToast;
