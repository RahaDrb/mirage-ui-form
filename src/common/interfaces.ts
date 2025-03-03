
export interface Choice {
    id?: number;
    name?: string;
    checked: boolean;
    order: number;
    text: string;
}
export interface OptionObject {
    id: string;
    name: string;
}
export interface FormState {
    question: string;
    show: boolean;
    options: OptionObject[];
    option: number;
    choices: Choice[];
    setQuestion: (value: string) => void;
    setShow: (value: boolean) => void;
    setOptions: (value: OptionObject[]) => void;
    setOption: (value: number) => void;
    setChoices: (value: Choice[]) => void;
    resetForm: () => void;
}

export interface FormLabelProps {
    label: string;
    htmlFor: string | number;
    modal?: boolean;
    setShow?: (value: boolean) => void;
}


export interface QuestionData {
    questionText: string;
    questionType: number;
    choices: Choice[];
}

export interface ApiResponse {
    question: {
        id: number | string;
    };
    status: number;
}
export interface FormInputProps {
    id?: string | number;
    label?: string;
    type: string;
    ariaLabel?: string;
    value: string | boolean;
    setValue?: (value: string | boolean, id?: string) => void;
    modal?: boolean;
    setShow?: (value: boolean) => void;
    htmlFor?: string | number;
    placeholder?: string;
    className?: string;
}
