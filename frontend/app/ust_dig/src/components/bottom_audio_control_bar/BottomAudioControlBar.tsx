'use client'

import React, { useEffect, useState } from "react";
import './BottomAudioControlBar.css';
import PlayPauseButton from "./play_pause_button/PlayPauseButton";
import SettingsButton from "../settings_button/settings_button";
import VolumeControls from "../volume_controls/VolumeControls";
import SeekerBar from "./seeker_bar/SeekerBar";
import AudioInfo from "./audio_info/AudioInfo";
import { useAudioContextHelperStore } from "@/store";
import { MdSkipNext, MdSkipPrevious } from "react-icons/md";
import { useUIHelperStore } from "@/uiStore";


function BottomAudioControlBar() {
	const audioLength = useAudioContextHelperStore((state => state.audioLength));
	const currentTime = useAudioContextHelperStore((state => state.currentTime));
	const isAudioPlaying = useAudioContextHelperStore((state) => state.isAudioPlaying);
	const currentTrackInfo = useAudioContextHelperStore((state) => state.currentTrackInfo);
	const [bottomBarToggle, setBottomBarToggle] = useState(false);


	const { isBottomBarActive, setIsBottomBarActive } = useUIHelperStore()

	useEffect(() => {
		if (isAudioPlaying == true) {
			setBottomBarToggle(true);
			setIsBottomBarActive();
		}
	}, [isAudioPlaying, setIsBottomBarActive]);


	return (
		<div>
			{bottomBarToggle &&
				<div id="BottomAudioControlBar">
					<div id="controlsWrapper">
						<div className="playControlsWrapper">
							<MdSkipPrevious onClick={() => alert('unimplemented.')} />
							<PlayPauseButton></PlayPauseButton>
							<MdSkipNext onClick={() => alert('unimplemented.')}></MdSkipNext>
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

export default BottomAudioControlBar;
