import Toast from 'react-bootstrap/Toast';
import {useFormStore} from "../../stores/useFormStore";

function CommonToast() {
    const {errorMessage} = useFormStore()
    return (
        <Toast>
            <Toast.Body>{errorMessage}</Toast.Body>
        </Toast>
    );
}

export default CommonToast;