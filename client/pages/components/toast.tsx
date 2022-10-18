import { Button, useToasts } from '@geist-ui/core';

interface Toast {
  text: string;
}

const Toast = ({ text }: Toast) => {
  const { setToast } = useToasts();
  const click = () => setToast({ text: text, delay: 5000 });
  return (
    <Button scale={2 / 3} auto onClick={click}>
      Enroll now
    </Button>
  );
};

export default Toast;
