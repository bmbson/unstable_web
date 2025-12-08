'use client'

import Image from 'next/image'
import './page.css';
import SlideDisplay from '@/components/slide_display/slide_display';
import CarouselIndicator from '@/components/carousel_indicator/carousel_indicator';
import { useEffect, useState } from 'react';
import { ctx } from './audioContextBackendClass';

const string = '/images/frontpage_images/sea.jpg'

export default function Home() {
	const [index, setIndex] = useState<number>(2);
	const [autoPlay, setAutoPlay] = useState<boolean>(true);

	function nextItem() {
		if (index < 2) {
			setIndex(index + 1);
		} else {
			setIndex(0);
		}
	}

	function prevItem() {
		if (index <= 0) {
			setIndex(2);
		} else {
			setIndex(index - 1);
		}
	}

	function toggleAutoPlay() {
		setAutoPlay(!autoPlay)
	}

	useEffect(() => {
		if (autoPlay == true) {
			const scroll = setInterval(() => {
				nextItem();
			}, 5000);

			return () => {
				clearInterval(scroll);
			};
		} else {

		}
	},); // optional dependency array

	return (
		<main>
			<div className="frontPageWrapper">
				<div className="ImageWrapper">
					<SlideDisplay controlL={() => prevItem()} controlR={() => nextItem()} src={string} alt="test" index={index}></SlideDisplay>
				</div>
				<div className='CarouselWrapper'>
					<CarouselIndicator elementAmount={3} currentIndex={index} pauseButton={() => toggleAutoPlay()} status={autoPlay} ></CarouselIndicator>
				</div>
			</div>
		</main >
	)
}
