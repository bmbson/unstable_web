import React from "react";
import MixCard from "../mix_card/mix_card";
import './mix_panel.css'
import { fetchTest } from "@/app/ts/mix_panel/data";

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

async function MixPanel() {
	var testVar = await fetchTest();
	console.log(testVar)

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

			<MixCard mixUrl={testVar.toString()} mixName={testVar[0].genres} artist={testVar[0].mix_creator} imageSrc={mix4.mixImage} date={testVar.toString()}></MixCard>
		</div >
	)
};

export default MixPanel;
