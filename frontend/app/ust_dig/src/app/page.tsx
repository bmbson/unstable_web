'use client'

import Image from 'next/image'
import './page.css';
import SlideDisplay from '@/components/slide_display/slide_display';
import CarouselIndicator from '@/components/carousel_indicator/carousel_indicator';
import { useEffect, useState } from 'react';

const string = '/images/frontpage_images/sea.jpg'

export default function Home() {
	const [index, setIndex] = useState<number>(1);

	function nextItem() {
		if (index - 1 >= index + 1) {
			setIndex(index + 1);
		} else {
			setIndex(0);
		}
	}

	function prevItem() {
		if (index <= 0) {
			setIndex(index - 1);
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


	return (
		<main>
			<div className="frontPageWrapper">
				<div className="ImageWrapper">
					<SlideDisplay src={string} alt="test" index={index}></SlideDisplay>
				</div>
				<div className='CarouselWrapper'>
					<CarouselIndicator index={3} ></CarouselIndicator>
				</div>
			</div>
		</main >
	)
}
