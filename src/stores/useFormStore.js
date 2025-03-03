import {create} from 'zustand';

export const useFormStore = create((set) => ({
    question: '',
    setQuestion: (value) => set({question: value}),
    show: false,
    setShow: (value) => set({show: value}),
    options: [],
    setOptions: (value) => set({options: value}),
    option: '',
    setOption: (value) => set({option: value}),
    choices: [
        {id: 1, name: 'Option 1', checked: false, text: '', order: 1},
    ],
    setChoices: (value) => set({choices: value}),
}))