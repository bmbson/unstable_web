'use client'

import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import './BottomAudioControlBar.css';
import PlayPauseButton from "./play_pause_button/PlayPauseButton";
import SettingsButton from "../settings_button/settings_button";
import VolumeControls from "../volume_controls/VolumeControls";
import SeekerBar from "./seeker_bar/SeekerBar";
import AudioInfo from "./audio_info/AudioInfo";
import { useAudioContextHelperStore } from "@/store";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useUIHelperStore } from "@/uiStore";
import { ctx } from "@/app/audioContextBackendClass";
import { extractAfterLastSlashUrl } from "@/app/ts/urlManipulationHelpers";


function BottomAudioControlBar() {
	const audioLength = useAudioContextHelperStore((state => state.audioLength));
	const currentTime = useAudioContextHelperStore((state => state.currentTime));
	const isAudioPlaying = useAudioContextHelperStore((state) => state.isAudioPlaying);
	const currentTrackInfo = useAudioContextHelperStore((state) => state.currentTrackInfo);
	const currentElement = useAudioContextHelperStore((state) => state.currentElement);
	const [bottomBarToggle, setBottomBarToggle] = useState(false);
	const { isBottomBarActive, setIsBottomBarActive } = useUIHelperStore()
	const setIsAudioPlaying = useAudioContextHelperStore((state => state.setIsAudioPlaying));
	const setAudioLength = useAudioContextHelperStore((state) => state.setAudioLength);

	const mixRef = useRef<null | HTMLAudioElement | undefined>(undefined);
	useEffect(() => {
		ctx.initAudioContext();
		ctx.setAudioElement(mixRef.current!)
		ctx.createAudioContext()
	}, [])

	useEffect(() => {
		if (isAudioPlaying == true) {
			setBottomBarToggle(true);
			setIsBottomBarActive();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAudioPlaying]);

	useEffect(() => {
		if (currentElement) {
			console.log("New track selected:", currentElement.src);
			console.log(extractAfterLastSlashUrl(mixRef.current!.src) + " current");
			console.log(mixRef.current?.getAttribute("src") + " current getAttribute");
			// Eerste mixRef is null omdat de audio tag nog niet gerendered is met de currentElement.
			ctx.audioElement!.pause();
			//ctx.audioElement!.src = mixRef.current!.src
			ctx.audioElement!.src = mixRef.current?.getAttribute('src');
			ctx.audioElement!.load();
			setIsAudioPlaying(true);
			ctx.resumeAudioContext();
			ctx.audioElement!.play();
		}
	}, [currentElement]);

	function testFunction() {
		console.log(ctx.audioCtx)
		console.log(ctx.audioElement!.src)
		console.log(currentElement)
		console.log(ctx.audioSourceNode)
	}

	return (
		<div>
			<audio
				ref={mixRef}
				// If currentElement exists, calculate the path. Otherwise, set src to undefined or ""
				src={currentElement ? "/music/" + extractAfterLastSlashUrl(currentElement.src) : null}
			/>
			{bottomBarToggle &&
				<div id="BottomAudioControlBar">
					<div id="controlsWrapper">
						<div className="playControlsWrapper">
							<MdSkipPrevious onClick={() => ctx.getCTXInfo()} />
							<PlayPauseButton></PlayPauseButton>
							<MdSkipNext onClick={() => testFunction()}></MdSkipNext>
						</div>
						<div className="nextButton"></div>
						<VolumeControls></VolumeControls>
						<SeekerBar currentTime={currentTime} audioDuration={audioLength}></SeekerBar>
						<AudioInfo mixName={currentTrackInfo[0].toString()} artistName={currentTrackInfo[1].toString()} mixUrl={currentTrackInfo[2].toString()}></AudioInfo>

						<SettingsButton></SettingsButton>
					</div>
				</div>}</div>
	);
}

export default BottomAudioControlBar
