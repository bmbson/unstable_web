import React, { useEffect, useState } from "react";
import Image from 'next/image'
import './slide_display.css'
import Link from "next/link";

interface slideDisplayImageItem {
	title: string;
	url: string;
	imageUrl: string;
}

const items: slideDisplayImageItem[] = [
	{
		title: "Image One",
		url: "/mixes",
		imageUrl: "/images/frontpage_images/metal.jpg",
	},
	{
		title: "Image Two",
		url: "/mixes",
		imageUrl: "/images/frontpage_images/greenpaisley.jpg",
	},
	{
		title: "Image Three",
		url: "/mixes",
		imageUrl: "/images/frontpage_images/Untitled.png",
	},
];

function SlideDisplay({ src, alt, index }: { src: string; alt: string; index: any }) {

	return (
		<div className="slideDisplayWrapper">
			<div className="slideDisplayControl" id="slideDisplayControl-L" onClick={() => { }} ></div>
			<Link id="linkWrapper" href={items[index].url}>
				<Image className="image" fill={true} src={items[index].imageUrl} alt={items[index].title} ></Image>
			</Link>
			<div className="slideDisplayControl" id="slideDisplayControl-R" onClick={() => { }} ></div>
		</div >
	)
}

export default SlideDisplay;
