import { useToasts, Button } from "@geist-ui/core";

const Toast = () => {

    const { setToast } = useToasts()
    const click = () => setToast({ text: 'Successfully enrolled.', delay: 5000 })
    return <Button scale={2/3} auto onClick={click}>Enroll now</Button>
  
};


export default Toast;