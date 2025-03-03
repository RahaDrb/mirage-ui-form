import {create} from 'zustand';

let initialData = {
    errorMessage: '',
    errorId: null
}
export const useErrorStore = create((set) => ({
    ...initialData,
    setErrorMessage: (value) => set({errorMessage: value}),
    setErrorId: (value) => set({errorId: value}),
    resetErrors: () => set({
        errorMessage: '',
        errorId: null
    }),
}))