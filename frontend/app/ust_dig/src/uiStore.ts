import { create } from "zustand";
import { ctx } from "./app/audioContextBackendClass";


type uiHelperStore = {
	isBottomBarActive: boolean;
	setIsBottomBarActive: () => void;
}

export const useUIHelperStore = create<uiHelperStore>((set) => ({
	isBottomBarActive: false,

	setIsBottomBarActive: () => set((state) => ({ isBottomBarActive: true })),
}))
