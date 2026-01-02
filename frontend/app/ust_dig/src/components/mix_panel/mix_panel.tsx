'use client'

import useSWR from "swr"
import MixCard from "../mix_card/mix_card";
import './mix_panel.css'

function MixPanel() {
	const fetcher = (url: any) => fetch(url).then((res) => res.json())
	const { data, error, isLoading } = useSWR('http://localhost:9999/getmixes', fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateIfStale: false,
	});

	console.log(data)
	return (
		<div id="mixPanel">
			<ul id="mixCardList">
				{data && data.map((item: any) => (
					<li key={item.id}><MixCard mixUrl={"http://10.1.0.10:9999" + item.mix_audio_location} mixName={item.mix_title} artist={item.mix_creator} imageSrc={"http://10.1.0.10:9999" + item.mix_picture_location} date={"2020"} description={item.description}></MixCard></li>
				))}
			</ul>
		</div >
	)
};

export default MixPanel;
