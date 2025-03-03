import { create, StateCreator } from 'zustand';

export interface Choice {
    id: number;
    name: string;
    checked: boolean;
    order: number;
    text: string;
}
export interface OptionObject {
    id: string;
    name: string;
}
interface FormState {
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

export const defaultChoice: Choice = {
    id: 1,
    name: 'Option 1',
    checked: false,
    text: '',
    order: 1,
};

const initialData: Omit<FormState, 'setQuestion' | 'setShow' | 'setOptions' | 'setOption' | 'setChoices' | 'resetForm'> = {
    question: '',
    show: false,
    options: [],
    option: 0,
    choices: [JSON.parse(JSON.stringify(defaultChoice))],
};

const createFormStore: StateCreator<FormState> = (set) => ({
    ...initialData,
    setQuestion: (value: string) => set({ question: value }),
    setShow: (value: boolean) => set({ show: value }),
    setOptions: (value: OptionObject[]) => set({ options: value }),
    setOption: (value: number) => set({ option: value }),
    setChoices: (value: Choice[]) => set({ choices: value }),
    resetForm: () => set(JSON.parse(JSON.stringify(initialData))),
});

export const useFormStore = create<FormState>(createFormStore);