import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {defaultChoice, useFormStore} from '../../stores/useFormStore';
import FormSelect from './FormSelect';
import CommonButton from '../common/CommonButton';
import useTypesQuery from '../../queries/useTypesQuery';
import Loading from '../common/Loading';
import CommonToast from '../common/CommonToast';
import {Choice} from "../../common/interfaces";

function FormModal(): React.JSX.Element {
    const { show, setShow, option, setOption, options, setChoices, choices } = useFormStore();
    const [prevOption, setPrevOption] = useState<number>(0);
    const [prevChoices, setPrevChoices] = useState<Choice[]>([]);

    useEffect(() => {
        if (show) {
            setChoices([JSON.parse(JSON.stringify(defaultChoice))]);
        }
    }, [option]);

    useEffect(() => {
        if (show) {
            setPrevOption(option);
            setPrevChoices([...choices]);
        }
    }, [show]);

    const handleClose = () => {
        setOption(prevOption);
        setChoices([...prevChoices]);
        setShow(false);
    };

    const submitChanges = async () => {
        setShow(false);
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Question Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSelect
                        options={options}
                        value={option}
                        onChange={(e) => setOption(e)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <CommonButton variant={'secondary'} onClick={handleClose} text={'Cancel'} type={'button'} />
                    <CommonButton variant={'primary'} text={'Save Changes'} type={'button'} onClick={submitChanges} />
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default FormModal;