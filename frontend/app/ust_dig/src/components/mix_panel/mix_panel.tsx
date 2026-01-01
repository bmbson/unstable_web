'use client'

import useSWR from "swr"
import MixCard from "../mix_card/mix_card";
import './mix_panel.css'
import { fetchTest, MixTyping, sql } from "@/app/ts/mix_panel/data";
import postgres, { RowList } from "postgres";

const mix1 = {
	mixUrl: '/music/tm404.mp3',
	mixName: 'dub techno',
	mixDate: '2001',
	mixImage: '/images/tm404.jpg',
	mixCreator: 'tm404',
	genres: ['dub techno'],
};

const mix2 = {
	mixUrl: '/music/keef.flac',
	mixName: 'chi drill mix',
	mixDate: '2012',
	mixImage: '/images/so.jpg',
	mixCreator: 'eza',
	genres: ['chi drill'],
}

const mix3 = {
	mixUrl: '/music/nationHoe.wav',
	mixName: 'footwork',
	mixDate: '2012',
	mixImage: '/images/testImage.jpg',
	mixCreator: 'dj blah blaj',
	genres: ['footwork'],
}

const mix4 = {
	mixUrl: '/music/sgp.mp3',
	mixName: 'SGP Mix',
	mixDate: '2016',
	mixImage: '/images/blood-moon.png',
	mixCreator: 'SGP',
	genres: ['dub'],
}


function MixPanel() {
	// var data = await fetchTest();
	const fetcher = (url: any) => fetch(url).then((res) => res.json())
	const { data, error, isLoading } = useSWR('http://localhost:9999/getmixes', fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateIfStale: false,
	});

	return (
		<div id="mixPanel">
			<MixCard mixUrl={mix4.mixUrl} mixName={mix4.mixName} artist={mix4.mixCreator} imageSrc={mix4.mixImage} date={mix4.mixDate}></MixCard>

			<ul id="mixCardList">
				{data && data.map((item: any) => (
					<li key={item.id}><MixCard mixUrl={item.mix_audio_location} mixName={item.mix_title} artist={item.mix_creator} imageSrc={"http://10.1.0.10:9999" + item.mix_picture_location} date={"2020"} description={item.description}></MixCard></li>
				))}
			</ul>
		</div >
	)
};

export default MixPanel;
