'use client'

import Image from 'next/image'
import './mix_card.css'
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { MdOutlinePlayCircleOutline, MdOutlinePauseCircleOutline } from "react-icons/md";
import { ctx } from '@/app/audioContextBackendClass';
import { useAudioContextHelperStore } from '@/store';
import { extractAfterLastSlashUrl } from '@/app/ts/urlManipulationHelpers';
import useSWR from 'swr';

interface Props {
	'mixName': string;
	'artist': string;
	'imageSrc'?: string | null;
	'date': string;
	'mixUrl'?: string;
	width?: string;
	height?: string;
}

function MixCard({ mixName, artist, mixUrl, date, width, height, imageSrc = null }: Props) {
	const bottomInfoRef = useRef<null | HTMLDivElement>(null);
	const mixCardRef = useRef<null | HTMLDivElement>(null);
	const mixCardAudioRef = useRef<HTMLMediaElement>(null);
	const [playPauseState, setPlayPauseState] = useState(true);

	const setCurrentElement = useAudioContextHelperStore((state) => state.setCurrentElement);
	const setAudioLength = useAudioContextHelperStore((state) => state.setAudioLength);
	const setCurrentTime = useAudioContextHelperStore((state) => state.setCurrentTime);
	const setCurrentTrackInfo = useAudioContextHelperStore((state) => state.setCurrentTrackInfo)
	const setIsAudioPlaying = useAudioContextHelperStore((state => state.setIsAudioPlaying));

	const isAudioPlaying = useAudioContextHelperStore((state => state.isAudioPlaying));
	const currentElement = useAudioContextHelperStore((state) => state.currentElement);
	const currentPlayingTrack = useAudioContextHelperStore((state => state.currentPlayingTrack))

	function showInfoOnMouseOver() {
		bottomInfoRef.current!.style.visibility = 'visible';
		mixCardRef.current!.style.visibility = 'visible';
	};

	function hideInfoOnMouseLeave() {
		bottomInfoRef.current!.style.visibility = 'hidden';
		mixCardRef.current!.style.visibility = 'hidden';
	};

	function setCTXAudioElement() {
		setCurrentTrackInfo([mixName, artist, imageSrc])
		setCurrentElement(mixCardAudioRef.current!);
		setAudioLength();
	};

	function updateSeekerBarSliderTimer() {
		{/*is set interval the most effiecient way to do this?*/ }
		{/* code duplication with playPauseButton.*/ }
		setInterval(() => {
			// Update currentAudioTime every 100ms.
			setCurrentTime();
		}, 10);
	};

	function playPauseAudioButton() {
		throw new Error('Function not implemented.');
	};

	return (
		<>
			<div className="mixCard" onMouseOver={showInfoOnMouseOver} onMouseLeave={hideInfoOnMouseLeave} >
				<audio ref={mixCardAudioRef} src={mixUrl} />

				{/* Deze button moet een clickable image worden.*/}
				<div className="imageWrapper" style={{ position: 'relative' }}>
					<Image id='image' fill={true} src={imageSrc!} alt={'Image'}>
					</Image>
					<div className='mixCardPlayPauseButton' ref={mixCardRef} onClick={() => {
						if (isAudioPlaying == true) {
							setIsAudioPlaying(false)
							ctx.audioCtx?.suspend()
						} else if (isAudioPlaying == false) {
							setCTXAudioElement();
							setIsAudioPlaying(true)
							ctx.resumeAudioContext()
						}
					}}>
						<div id="playPauseImage">
							{isAudioPlaying && extractAfterLastSlashUrl(mixUrl) == extractAfterLastSlashUrl(currentElement.src) ? <MdOutlinePauseCircleOutline size={150}></MdOutlinePauseCircleOutline> : <MdOutlinePlayCircleOutline size={150}></MdOutlinePlayCircleOutline>}
						</div>
					</div>

					<div className="bottomInfo" ref={bottomInfoRef}>
						<div className="bottomInfoLeft">
							<Link prefetch={true} href={'/selected_mix'}>
								<p>{mixName}</p>
								<p>{artist}</p>
							</Link >
						</div>
						<div className="bottomInfoRight">
							<p>{date}</p>
						</div>
					</div>

				</div>
			</div >

		</>
	)
};

export default MixCard;




