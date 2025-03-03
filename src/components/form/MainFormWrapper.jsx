import React, {useEffect} from 'react';
import FormBox from "./FormBox";
import FormButtons from "./FormButtons";
import axios from "axios";
import {useFormStore} from "../../stores/useFormStore";
import {useNavigate} from "react-router-dom";

function MainFormWrapper(props) {
    const {option, question, choices} = useFormStore()
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const body = {
                questionText: question,
                questionType: option,
                choices: choices.map((q) => {
                    return {
                        checked: q.checked,
                        text: q.text,
                        order: q.order
                    }
                }),
            }
            const res = await axios.post('/api/questions', body);

            if (res.status < 300) {
                navigate(`/questions/${res.data.question.id}`);
            }

        } catch (error) {
            console.log(error, error.response.data.message)
        }
    }
    return (
        <form className={''}
            onSubmit={handleSubmit}>
            <FormBox/>
            <FormButtons/>
        </form>
    );
}

export default MainFormWrapper;