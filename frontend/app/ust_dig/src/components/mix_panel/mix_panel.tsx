'use client'

import useSWR from "swr"
import MixCard from "../mix_card/mix_card";
import './mix_panel.css'
import { fetchTest, MixTyping, sql } from "@/app/ts/mix_panel/data";
import postgres, { RowList } from "postgres";

const mix1 = {
	mixUrl: './tm404.mp3',
	mixName: 'dub techno',
	mixDate: '2001',
	mixImage: '/images/tm404.jpg',
	mixCreator: 'tm404',
	genres: ['dub techno'],
};

const mix2 = {
	mixUrl: './keef.flac',
	mixName: 'chi drill mix',
	mixDate: '2012',
	mixImage: '/images/so.jpg',
	mixCreator: 'eza',
	genres: ['chi drill'],
}

const mix3 = {
	mixUrl: './nationHoe.wav',
	mixName: 'footwork',
	mixDate: '2012',
	mixImage: '/images/testImage.jpg',
	mixCreator: 'dj blah blaj',
	genres: ['footwork'],
}

const mix4 = {
	mixUrl: './sgp.mp3',
	mixName: 'SGP Mix',
	mixDate: '2016',
	mixImage: '/images/blood-moon.png',
	mixCreator: 'SGP',
	genres: ['dub'],
}


function MixPanel() {
	// var data = await fetchTest();
	const fetcher = (url: any) => fetch(url).then((res) => res.json())
	const { data, error } = useSWR('/api/mixes', fetcher)

	return (
		<div id="mixPanel">
			<MixCard mixUrl={mix1.mixUrl} mixName={mix1.mixName} artist={mix1.mixCreator} imageSrc={mix1.mixImage} date={mix1.mixDate}></MixCard>
			<MixCard mixUrl={mix2.mixUrl} mixName={mix2.mixName} artist={mix2.mixCreator} imageSrc={mix2.mixImage} date={mix2.mixDate}></MixCard>
			<MixCard mixUrl={mix3.mixUrl} mixName={mix3.mixName} artist={mix3.mixCreator} imageSrc={mix3.mixImage} date={mix3.mixDate}></MixCard>
			<MixCard mixUrl={mix4.mixUrl} mixName={mix4.mixName} artist={mix4.mixCreator} imageSrc={mix4.mixImage} date={mix4.mixDate}></MixCard>
			<MixCard mixUrl={mix1.mixUrl} mixName={mix1.mixName} artist={mix1.mixCreator} imageSrc={mix1.mixImage} date={mix1.mixDate}></MixCard>
			<MixCard mixUrl={mix2.mixUrl} mixName={mix2.mixName} artist={mix2.mixCreator} imageSrc={mix2.mixImage} date={mix2.mixDate}></MixCard>
			<MixCard mixUrl={mix3.mixUrl} mixName={mix3.mixName} artist={mix3.mixCreator} imageSrc={mix3.mixImage} date={mix3.mixDate}></MixCard>
			<MixCard mixUrl={mix4.mixUrl} mixName={mix4.mixName} artist={mix4.mixCreator} imageSrc={mix4.mixImage} date={mix4.mixDate}></MixCard>

			<ul id="mixCardList">
				{data.map((item) => (
					<li key={item.id}><MixCard mixUrl={mix1.mixUrl} mixName={item.mix_title} artist={item.mix_creator} imageSrc={mix1.mixImage} date={item.mix_picture_location}></MixCard></li>
				))}
			</ul>
		</div >
	)
};

export default MixPanel;
