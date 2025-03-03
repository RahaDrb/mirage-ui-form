import React, { ChangeEvent } from 'react';
import Form from 'react-bootstrap/Form';

interface Option {
    id: number | string;
    name: string;
}

interface FormSelectProps {
    value: number;
    onChange: (value: number) => void;
    options?: Option[];
}

function FormSelect({ value, onChange, options }: FormSelectProps): React.JSX.Element {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(parseInt(e.target.value));
    };

    return (
        <Form.Select value={value} onChange={handleChange}>
            <option disabled value={0}>
                Options
            </option>
            {options?.map((option) => (
                <option key={option.id} value={option.id}>
                    {option.name}
                </option>
            ))}
        </Form.Select>
    );
}

export default FormSelect;