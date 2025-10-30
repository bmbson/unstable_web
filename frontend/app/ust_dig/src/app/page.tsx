'use client'

import Image from 'next/image'
import './page.css';
import SlideDisplay from '@/components/slide_display/slide_display';

const string = '/images/frontpage_images/sea.jpg'

export default function Home() {
	return (
		<main>
			<div className="frontPageWrapper">
				<div className="ImageWrapper">
					<SlideDisplay src={string} alt="test"></SlideDisplay>
				</div>
			</div>
		</main >
	)
}
