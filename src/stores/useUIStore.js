import {create} from 'zustand';

export const useUIStore = create((set) => ({
    option: '',
    setOption: (value) => set({option: value}),
}))