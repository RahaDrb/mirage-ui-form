import Form from 'react-bootstrap/Form';

function FormSelect(props) {
    return (
        <Form.Select value={props.value}
                     onChange={e => {
                         props.onChange(parseInt(e.target.value));
                     }}>
            <option disabled value={''}>Options</option>
            {props.options?.map((option) => (
                <option key={option.id} value={option.id}>{option.name}</option>
            ))}
        </Form.Select>
    );
}

export default FormSelect;