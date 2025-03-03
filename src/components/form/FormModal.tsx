import React, { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import {Choice, defaultChoice, useFormStore} from '../../stores/useFormStore';
import FormSelect from './FormSelect';
import CommonButton from '../common/CommonButton';
import useTypesQuery from '../../queries/useTypesQuery';
import Loading from '../common/Loading';
import CommonToast from '../common/CommonToast';

function FormModal(): React.JSX.Element {
    const { show, setShow, option, setOption, setOptions, options, setChoices, choices } = useFormStore();
    const [prevOption, setPrevOption] = useState<number>(0);
    const [prevChoices, setPrevChoices] = useState<Choice[]>([]);
    const { data, isLoading, error } = useTypesQuery(show);

    useEffect(() => {
        if (isLoading || error || !show || !data) return;
        setOptions(data.questionTypes);
    }, [data, show, isLoading, error, setOptions]);

    useEffect(() => {
        if (show) {
            setChoices([JSON.parse(JSON.stringify(defaultChoice))]);
        }
    }, [option, show, setChoices]);

    useEffect(() => {
        if (show) {
            setPrevOption(option);
            setPrevChoices([...choices]);
        }
    }, [show, option, choices]);

    const handleClose = () => {
        setOption(prevOption);
        setChoices([...prevChoices]);
        setShow(false);
    };

    const submitChanges = async () => {
        setShow(false);
    };

    if (isLoading) {
        return <Loading />;
    }

    if (error) {
        return <CommonToast error={'Error'} close={() => {}} />;
    }
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