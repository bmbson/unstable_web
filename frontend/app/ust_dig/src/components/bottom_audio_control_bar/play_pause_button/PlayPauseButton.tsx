'use client'

import { MdPause, MdPlayArrow } from "react-icons/md";
import { ctx } from "@/app/audioContextBackendClass";
import { useAudioContextHelperStore } from "@/store";


function PlayPauseButton() {
	const setIsAudioPlaying = useAudioContextHelperStore((state) => state.setIsAudioPlaying);
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
			if (isAudioPlaying == true) {
				setIsAudioPlaying(false)
				ctx.pauseAudioElement()
			} else if (isAudioPlaying == false) {
				setIsAudioPlaying(true)
				ctx.playAudioElement()
			}
		}}
			id="playPauseButton">
			{isAudioPlaying ? <MdPause></MdPause> : <MdPlayArrow></MdPlayArrow>}
		</button >
	</>
}

export default PlayPauseButton;
