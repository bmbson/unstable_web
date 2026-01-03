'use client'

import './page.css';
import SlideDisplay from '@/components/slide_display/slide_display';
import CarouselIndicator from '@/components/carousel_indicator/carousel_indicator';
import { useEffect, useState } from 'react';
import useSWR from 'swr';


export default function Home() {
	const [index, setIndex] = useState<number>(2);
	const [autoPlay, setAutoPlay] = useState<boolean>(true);

	const fetcher = (url: any) => fetch(url).then((res) => res.json())
	const { data, error, isLoading } = useSWR('http://localhost:9999/getcarousel', fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateIfStale: false,
	});

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
	},);

	return (
		<main>
			<div className="frontPageWrapper">
				<div className="ImageWrapper">
					{data && <SlideDisplay controlL={() => prevItem()} controlR={() => nextItem()} src={"http://10.1.0.10:9999" + data[index].img_src} alt={data[index].select_mix_link ?? ""} index={index} link={data[index].select_mix_link ?? ""} ></SlideDisplay>}
				</div>
				<div className='CarouselWrapper'>
					{data && <CarouselIndicator elementAmount={Object.keys(data).length - 1} currentIndex={index} pauseButton={() => toggleAutoPlay()} status={autoPlay} ></CarouselIndicator>
					}
				</div>
			</div>
		</main >
	)
}
