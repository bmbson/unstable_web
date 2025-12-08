'use client'

import { MdPause, MdPlayArrow } from "react-icons/md";
import { ctx } from "@/app/audioContextBackendClass";
import { useAudioContextHelperStore } from "@/store";


function PlayPauseButton() {
	const updateIsAudioPlaying = useAudioContextHelperStore((state) => state.updateIsAudioPlaying);
	const isAudioPlaying = useAudioContextHelperStore((state) => state.isAudioPlaying);
	const setAudioLength = useAudioContextHelperStore((state) => state.setAudioLength);
	const setCurrentTime = useAudioContextHelperStore((state) => state.setCurrentTime);

	function updateSeekerBarSliderTimer() {
		{/*is set interval the most efficient way to do this?*/ }
		{/* code duplication with mix_card.*/ }
		setInterval(() => {
			// Update currentAudioTime every 100ms.
			setCurrentTime();
		}, 10);
	}


	return <>
		<button onClick={() => {
			{/* code duplication with mix_card.*/ }
			if (ctx.audioSourceNode == undefined) {
				console.log('add track to audio context');
			} else {
				if (isAudioPlaying == false) {
					ctx.createAudioContext();
					ctx.resumeAudioContext();
					updateSeekerBarSliderTimer();
					setAudioLength();
					ctx.playAudioElement();
					updateIsAudioPlaying(true);
				} else {
					ctx.pauseAudioElement();
					updateIsAudioPlaying();
				}
			}
		}} id="playPauseButton">
			{isAudioPlaying ? <MdPause></MdPause> : <MdPlayArrow></MdPlayArrow>}
		</button>
	</>
}

export default PlayPauseButton;
