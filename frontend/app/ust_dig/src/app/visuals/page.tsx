import CablesPatch from "@/components/cable_patch/cables_patch"
import React from "react"
import './page.css'

export default function Visuals() {
	return (
		<main>
			<div className="textDiv">
				<p>Work</p>
				<p>In</p>
				<p>Process</p>
				{/* <CablesPatch/>
        <CablesPatch patchDir={"/patch1/"} canvasId={"othercanvas"} patchOptions={{ "glCanvasResizeToWindow": false }}/> */}
			</div>
		</main>
	)
}

