import MixPanel from "@/components/mix_panel/mix_panel"
import './page.css'
import React from "react"

export default function Mixes() {
	return (
		<main>
			<div id="leftSide">
				<div className="mixPanelWrapper">
					<MixPanel></MixPanel>
				</div>
			</div>
			<div className="rightSide">
			</div>
		</main >
	)
}
