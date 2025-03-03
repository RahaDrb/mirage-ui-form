import {create} from 'zustand';
import {StateCreator} from "zustand/index";
import {ErrorState} from "../common/interfaces";

const initialData: Omit<ErrorState, 'setErrorMessage' | 'setErrorId' | 'resetErrors'> = {
    errorMessage: '',
    errorId: 0,
};

const createErrorStore: StateCreator<ErrorState> = (set) => ({
    ...initialData,
    setErrorMessage: (value: string) => set({errorMessage: value}),
    setErrorId: (value: number) => set({errorId: value}),
    resetErrors: () => set(JSON.parse(JSON.stringify(initialData))),
});

export const useErrorStore = create<ErrorState>(createErrorStore);