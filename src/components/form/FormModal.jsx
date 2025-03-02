import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {useFormStore} from "../../stores/useFormStore";
import FormSelect from "./FormSelect";
import CommonButton from "../common/CommonButton";

function FormModal() {
    const {show, setShow, options, option, setOption} = useFormStore()
    const [prevOption, setPrevOption] = useState('')
    useEffect(() => {
        if(show) {
            setPrevOption(option)
        }
    }, [show])
    const handleClose = () => {
        setOption(prevOption)
        setShow(false)
    }
    const submitChanges = async (e) => {
        e.preventDefault()
        setShow(false)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <form onSubmit={submitChanges}>
                <Modal.Header closeButton>
                    <Modal.Title>Question Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSelect options={options}
                                value={option}
                                onChange={setOption}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <CommonButton variant={'secondary'} onClick={handleClose} text={'Cancel'} type={'button'}/>
                    <CommonButton variant={'primary'} text={'Save Changes'} type={'submit'}/>
                </Modal.Footer>
            </form>
        </Modal>
    );
}

export default FormModal;