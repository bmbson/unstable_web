'use client'

import './SeekerBar.css';
import { useRef } from 'react';
import { fancyTimeFormat, reverseFancyTimeFormat } from '@/app/ts/timeManipulationHelpers';
import { useAudioContextHelperStore } from '@/store';

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

	function seekerBarEffect() {
		changeCurrentTime(inputRef.current.value);
	}

	return (<div id="seekerBar">
		<p id="currentAudioTime">{props.currentTime}</p>
		<input ref={inputRef} id="seekerBarSlider" type="range" min="0" onChange={() => seekerBarEffect()} value={reverseFancyTimeFormat(props.currentTime)!} max={reverseFancyTimeFormat(props.audioDuration)!} step="any"></input>
		<p id="totalAudioDuration">{props.audioDuration}</p>
	</div>)
}

export default SeekerBar;
