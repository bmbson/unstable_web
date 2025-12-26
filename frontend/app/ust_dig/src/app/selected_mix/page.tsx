import React from "react";
import './page.css';
import VisualCard from "@/components/visual_card/visual_card";
import MixPanel from "@/components/mix_panel/mix_panel";
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
	return (
		<main>
			<div id="mainWrapper">
				<div id="artistInfoWrapper">
					<VisualCard height="300px" width="300px" ></VisualCard>
				</div>
				<div id="mixPanelWrapper">
					<div id="description">
						<p>Description:</p>
						<p>Music or w/e.</p>
						{/* Description Here*/}
					</div>
				</div>
			</div>
		</main >
	)
}
