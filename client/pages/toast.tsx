import { useToasts, Button } from "@geist-ui/core";

const Toast = ({text}) => {
    const { setToast } = useToasts();
    const click = () => setToast({ text: text, delay: 5000 });
    return <Button scale={2/3} auto onClick={click}>Enroll now</Button>
  
};


export default Toast;