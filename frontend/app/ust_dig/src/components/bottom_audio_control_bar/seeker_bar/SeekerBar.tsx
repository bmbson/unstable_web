'use client'

import './SeekerBar.css';
import { useEffect, useRef } from 'react';
import { fancyTimeFormat, reverseFancyTimeFormat } from '@/app/ts/timeManipulationHelpers';
import { useAudioContextHelperStore } from '@/store';
import { ctx } from '@/app/audioContextBackendClass';

// TODO: 
// Seekerbar is still choppy.
// Ability to seek using the seekerbar.
// Not having to press button to use SeekerBar.

interface Props {
	currentTime: string;
	audioDuration: string
}

function SeekerBar(props: Props) {
	const inputRef = useRef(null);

	const changeCurrentTime = useAudioContextHelperStore((state) => state.changeCurrentTime);
	const setCurrentTime = useAudioContextHelperStore((state) => state.setCurrentTime);
	const setAudioLength = useAudioContextHelperStore((state) => state.setAudioLength);
	const currentElement = useAudioContextHelperStore((state) => state.currentElement);
	const currentTime = useAudioContextHelperStore((state => state.currentTime));
	const audioLength = useAudioContextHelperStore((state => state.audioLength));
	const setIsAudioPlaying = useAudioContextHelperStore((state => state.setIsAudioPlaying));


	function seekerBarEffect() {
		changeCurrentTime(inputRef.current.value);
	}

	useEffect(() => {
		const intervalId = setInterval(() => {
			// Update currentAudioTime every 10ms.
			setAudioLength();
			setCurrentTime();

			if (ctx.audioElement!.currentTime >= ctx.audioElement!.duration) {
				setIsAudioPlaying(false); // Update React state
				ctx.pauseAudioElement();  // Pause actual audio
			}
		}, 50);
		return () => {
			clearInterval(intervalId); // Clear the interval using the stored ID
		};

	}, [currentTime]);

	return (<div id="seekerBar">
		<p id="currentAudioTime">{props.currentTime}</p>
		<input ref={inputRef} id="seekerBarSlider" type="range" min="0" onChange={() => {
			seekerBarEffect()
		}
		} value={reverseFancyTimeFormat(props.currentTime)!} max={reverseFancyTimeFormat(props.audioDuration)!} step="any"></input>
		<p id="totalAudioDuration">{props.audioDuration}</p>
	</div >)
}

export default SeekerBar;
