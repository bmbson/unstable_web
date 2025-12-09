import { create } from "zustand";
import { ctx } from "./app/audioContextBackendClass";

type audioContextHelperStore = {
	setIsAudioPlaying: any;
	setCurrentTime: any;
	setAudioLength: any;
	setCurrentPlayingTrack: any;
	setCurrentTrackInfo: any;
	changeCurrentTime: any
	audioLength: string;
	currentTime: string;
	isAudioPlaying: boolean;
	currentPlayingTrack: any;
	currentTrackInfo: Array<string>;
	currentElement: any;
	setCurrentElement: any;
}

export const useAudioContextHelperStore = create<audioContextHelperStore>((set) => ({
	isAudioPlaying: ctx.isAudioPlaying,
	audioLength: ctx.getAudioLength(),
	currentTime: ctx.getCurrentAudioTime(),
	currentPlayingTrack: ctx.audioElement?.src,
	currentElement: ctx.audioElement,
	currentTrackInfo: [],

	setCurrentTrackInfo: (trackInfoArray: any) => {
		set({ currentTrackInfo: trackInfoArray })
	},
	setCurrentPlayingTrack: () => {
		set({ currentPlayingTrack: ctx.audioElement?.src });
	},
	setCurrentElement: (element: any) => {
		set({ currentElement: element });
	},
	setAudioLength: () => {
		set({ audioLength: ctx.getAudioLength() });
	},
	changeCurrentTime: (time: number) => {
		set({ currentTime: ctx.changeCurrentTime(time) });
	},
	setCurrentTime: () => {
		set({ currentTime: ctx.getCurrentAudioTime() });
	},
	setIsAudioPlaying: (bool: boolean) => {
		set({ isAudioPlaying: bool });
	}
}));
