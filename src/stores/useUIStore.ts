import {create} from 'zustand';
import {StateCreator} from "zustand/index";
import {Choice, FormState, OptionObject} from "../common/interfaces";
import {defaultChoice} from "./useFormStore";

interface UIState {
    option: number;
    checkedArr: number[];
    setOption: (value: number) => void;
    setCheckedArr: (value: number[]) => void;
}

const initialData: Omit<UIState, 'setOption' | 'setCheckedArr'> = {
    option: 0,
    checkedArr: []
};

const createUIStore: StateCreator<UIState> = (set) => ({
    ...initialData,
    setOption: (value: number) => set({option: value}),
    setCheckedArr: (value: number[]) => set({checkedArr: value}),
});

export const useUIStore = create<UIState>(createUIStore);