'use client'

import Image from 'next/image'
import './page.css';
import SlideDisplay from '@/components/slide_display/slide_display';
import CarouselIndicator from '@/components/carousel_indicator/carousel_indicator';
import { useEffect, useState } from 'react';

const string = '/images/frontpage_images/sea.jpg'

export default function Home() {
	const [index, setIndex] = useState<number>(2);

	function nextItem() {
		console.log(index)
		if (index < 2) {
			setIndex(index + 1);
		} else {
			setIndex(0);
		}
	}

	function prevItem() {
		console.log(index)
		if (index <= 0) {
			setIndex(2);
		} else {
			setIndex(index - 1);
		}
	}

	useEffect(() => {
		const scroll = setInterval(() => {
			nextItem();
		}, 5000);

		return () => {
			clearInterval(scroll);
		};
	},); // optional dependency array

	console.log(index)

	return (
		<main>
			<div className="frontPageWrapper">
				<div className="ImageWrapper">
					<SlideDisplay controlL={() => prevItem()} controlR={() => nextItem()} src={string} alt="test" index={index}></SlideDisplay>
				</div>
				<div className='CarouselWrapper'>
					<CarouselIndicator elementAmount={3} currentIndex={index} ></CarouselIndicator>
				</div>
			</div>
		</main >
	)
}
