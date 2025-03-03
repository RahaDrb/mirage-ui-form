import {create} from 'zustand';

let initialData = {
    errorMessage: '',
    errorId: 0
}
export const useErrorStore = create((set) => ({
    ...initialData,
    setErrorMessage: (value) => set({errorMessage: value}),
    setErrorId: (value) => set({errorId: value}),
    resetErrors: () => set({
        errorMessage: '',
        errorId: 0
    }),
}))