'use client';
import useSWR from 'swr';
import VisualCard from '../visual_card/visual_card';
import './SelectedMixCard.css';
import { usePathname, useParams } from 'next/navigation';
import MixCard from '../mix_card/mix_card';

export default function SelectedMixCard() {
	const pathname = usePathname();
	const params = useParams();
	// Make a call to the DB only if the data hasn't been sent to the component via the parent component.
	//
	const fetcher = (url: any) => fetch(url).then((res) => res.json())

	const { data, error, isLoading } = useSWR('http://localhost:9999/getmix/DarkPluggResearch1', fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateIfStale: false,
	});

	console.log(data)

	JSON.stringify(data, null, 2)

	return (
		<div id="selectedMixWrapper">
			<div id='topInfo'>
				<div id="title">
					{isLoading && <p>Loading</p>}
					{data && <p>{data[0].mixTitle}</p>}
				</div>
			</div>
			<div id="artistInfoWrapper">
				{isLoading && <p>Loading</p>}
				{data && <MixCard mixName={data[0].mixTitle} mixDate="2016" mixUrl={data[0].mixAudioLocation} imageSrc={data[0].mixPictureLocation} artist={data[0].mixCreator} description={data[0].description} > </MixCard>}
				<div id="description">
					<p>Description:</p>
					{isLoading && <p>Loading</p>}
					<p>{data && data[0].description}</p>
					{/* Description Here*/}
				</div>
			</div>
		</div >
	)
}
