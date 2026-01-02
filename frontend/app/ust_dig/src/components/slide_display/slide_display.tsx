'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import './slide_display.css'
import Link from "next/link";
import useSWR from "swr";

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

function SlideDisplay({ src, alt, index, controlL, controlR }: { src: string; alt: string; index: any, controlL: any, controlR: any }) {

	const fetcher = (url: any) => fetch(url).then((res) => res.json())
	const { data, error, isLoading } = useSWR('http://localhost:9999/getcarousel', fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateIfStale: false,
	});

	console.log(data)

	return (
		<div className="slideDisplayWrapper">
			<div className="slideDisplayControl" id="slideDisplayControl-L" onClick={controlL} ></div>
			{data && <Link id="linkWrapper" href={/mix/ + data[0].select_mix_link}>
				<Image className="image"
					sizes="auto auto"
					fill={true} src={"http://10.1.0.10:9999" + data[0].img_src} alt={"text"} ></Image>
			</Link>
			}
			<div className="slideDisplayControl" id="slideDisplayControl-R" onClick={controlR} ></div>
		</div >
	)
}

export default SlideDisplay;
