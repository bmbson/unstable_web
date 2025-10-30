import './AudioInfo.css'
import Image from 'next/image'

interface Props {
	mixName: string,
	artistName: string,
	mixUrl: string,
}


function AudioInfo(props: Props) {
	return (
		<div id="AudioInfo">
			<Image id="picture" src={props.mixUrl} height={50} width={50} alt={''}></Image>
			<div id="textInfo">
				<div><p className='propText'>{props.mixName}</p></div>
				<div><p className='propText'>{props.artistName}</p></div>
			</div>
		</div >
	);
}

export default AudioInfo;
