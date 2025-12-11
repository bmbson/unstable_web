import { ctx } from '@/app/audioContextBackendClass';
import './VolumeRangeSlider.css'
import { useRef } from 'react';

function VolumeRangeSlider() {
	const volumeRangeSliderRef = useRef<HTMLInputElement>(null);

	function controlVolume() {
		ctx.changeAudioContextVolume(Number(volumeRangeSliderRef.current?.value));
	}

	return <>
		<input ref={volumeRangeSliderRef} onInput={controlVolume} id="VolumeRangeSlider" type="range" min="0" max="1" defaultValue="0.8" step="0.01" />
	</>
}

export default VolumeRangeSlider;
