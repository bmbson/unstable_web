'use client'
import React, { useEffect, useState } from "react";
import Image from 'next/image'
import './slide_display.css'
import Link from "next/link";

function SlideDisplay({ src, alt, index, link, controlL, controlR }: { src: string, alt: string, index: any, link: string, controlL: any, controlR: any }) {

	return (
		<div className="slideDisplayWrapper">
			<div className="slideDisplayControl" id="slideDisplayControl-L" onClick={controlL} ></div>
			<Link id="linkWrapper" href={link}>
				<Image className="image"
					sizes="auto auto"
					fill={true} src={src} alt={"text"} ></Image>
			</Link>
			<div className="slideDisplayControl" id="slideDisplayControl-R" onClick={controlR} ></div>
		</div >
	)
}

export default SlideDisplay;
