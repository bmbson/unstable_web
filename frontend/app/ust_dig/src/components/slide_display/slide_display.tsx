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

function SlideDisplay({ src, alt, }: { src: string; alt: string; }) {
	const [index, setIndex] = useState(0);

	function nextItem() {
		if (items.length - 1 >= index + 1) {
			setIndex(index + 1);
		} else {
			setIndex(0);
		}
	}

	function prevItem() {
		if (index <= 0) {
			setIndex(items.length - 1);
		} else {
			setIndex(index - 1);
		}
	}

	// clear de interval later ook wanneer je op nextItem() of prevItem() klikt.
	useEffect(() => {
		const scroll = setInterval(() => {
			nextItem();
		}, 5000)
		return () => {
			clearInterval(scroll)
		}
	})

	return (
		<div className="slideDisplayWrapper">
			<div className="slideDisplayControl" id="slideDisplayControl-L" onClick={() => { prevItem() }} ></div>
			<Link id="linkWrapper" href={items[index].url}>
				<Image className="image" fill={true} src={items[index].imageUrl} alt={items[index].title} ></Image>
			</Link>
			<div className="slideDisplayControl" id="slideDisplayControl-R" onClick={() => { nextItem() }} ></div>
		</div >
	)
}

export default SlideDisplay;
