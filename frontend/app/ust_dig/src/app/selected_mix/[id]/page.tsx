'use client'
import React from "react";
import './page.css';
import { usePathname, useParams } from 'next/navigation'
import { use } from 'react'

import VisualCard from "@/components/visual_card/visual_card";
//
// Mix Title
// Creator Name
// Upload Date
// Description
//
// Recommended
//
//
export default function Selected_Mix() {
	const pathname = usePathname()
	const params = useParams()
	return (
		<main>
			<div id="mainWrapper">
				<div id="artistInfoWrapper">
					<VisualCard height="300px" width="300px" ></VisualCard>
				</div>
				<div id="mixPanelWrapper">
					<div id="description">
						<p>Description:</p>
						<p>Music or w/e {params.data}.</p>
						<p>{pathname}</p>
						{/* Description Here*/}
					</div>
				</div>
			</div>
		</main >
	)
};
