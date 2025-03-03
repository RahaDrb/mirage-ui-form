import React, {useEffect, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
import {useFormStore} from "../../stores/useFormStore";
import FormSelect from "./FormSelect";
import CommonButton from "../common/CommonButton";
import useTypesQuery from "../../queries/useTypesQuery";

function FormModal() {
    const {show, setShow, option, setOption, setOptions, options} = useFormStore()
    const [prevOption, setPrevOption] = useState('')
    const {data, isLoading, error} = useTypesQuery(show);
    useEffect(() => {
        if (isLoading || error) return
        setOptions(data)
    }, [data]);
    useEffect(() => {
        if (show) {
            setPrevOption(option)
        }
    }, [show])
    const handleClose = () => {
        setOption(prevOption)
        setShow(false)
    }
    const submitChanges = async () => {
        setShow(false)
    }
//todo
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <div>
                <Modal.Header closeButton>
                    <Modal.Title>Question Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormSelect options={options?.questionTypes}
                                value={option}
                                onChange={setOption}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <CommonButton variant={'secondary'} onClick={handleClose} text={'Cancel'} type={'button'}/>
                    <CommonButton variant={'primary'} text={'Save Changes'} type={'button'} onClick={submitChanges}/>
                </Modal.Footer>
            </div>
        </Modal>
    );
}

export default FormModal;