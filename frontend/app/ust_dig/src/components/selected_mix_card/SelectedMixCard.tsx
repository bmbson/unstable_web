'use client';
import useSWR from 'swr';
import VisualCard from '../visual_card/visual_card';
import './SelectedMixCard.css';
import { usePathname, useParams } from 'next/navigation';
import MixCard from '../mix_card/mix_card';
import { extractAfterLastSlashUrl } from '@/app/ts/urlManipulationHelpers';

export default function SelectedMixCard() {
	const pathname = usePathname();
	const params = useParams();
	const epath = extractAfterLastSlashUrl(pathname);

	// Make a call to the DB only if the data hasn't been sent to the component via the parent component.
	const fetcher = (url: any) => fetch(url).then((res) => res.json())

	const { data, error, isLoading } = useSWR(`http://10.1.0.10:9999/getmix/${epath}`, fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateIfStale: false,
	});

	return (
		<div id="selectedMixWrapper">
			<div id='topInfo'>
				<div id="title">
					{isLoading && <p>Loading</p>}
					{data && <p>{data[0].mix_title}</p>}
				</div>
			</div>
			<div id="artistInfoWrapper">
				{isLoading && <p>Loading</p>}
				{data && <MixCard mixName={data[0].mix_title} date="2016" mixUrl={"http://10.1.0.10:9999" + data[0].mix_audio_location} imageSrc={"http://10.1.0.10:9999" + data[0].mix_picture_location} artist={data[0].mix_creator} description={data[0].description} ></MixCard>}
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
