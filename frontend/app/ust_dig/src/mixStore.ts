import { create } from "zustand";

type mixHelperStore = {
	mixSrc: string;
	setMixSrc: () => any;
}

export const useMixHelperStore = create<mixHelperStore>((set) => ({
	mixSrc: "",

	setMixSrc: () => set((state) => ({ mixSrc: state.mixSrc })),
}))
