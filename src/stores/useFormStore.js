import {create} from 'zustand';

let initialData = {
    question: '',
    show: false,
    options: [],
    option: '',
    choices: [{id: 1, name: 'Option 1', checked: false, text: '', order: 1}],
}
export const useFormStore = create((set) => ({
    ...initialData,
    setQuestion: (value) => set({question: value}),
    setShow: (value) => set({show: value}),
    setOptions: (value) => set({options: value}),
    setOption: (value) => set({option: value}),
    setChoices: (value) => set({choices: value}),
    resetForm: () => set(initialData),
}))