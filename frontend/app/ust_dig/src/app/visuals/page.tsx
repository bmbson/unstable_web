'use client'
import React from "react"
import './page.css'
import "p5.sound/dist/p5.sound.js"
import { P5Canvas, Sketch } from "@p5-wrapper/react"

const sketch: Sketch = p5 => {
	p5.setup = () => { p5.createCanvas(1200, 1200, p5.WEBGL) };

	p5.draw = () => {
		p5.background(0);
		p5.normalMaterial();
		p5.push();
		// Turn on a magenta ambient light.
		p5.pointLight(135, 135, 135, -33, -150, 33);
		// Add a dark gray ambient material.
		p5.specularMaterial(150);
		p5.rotateZ(p5.frameCount * 0.005);
		p5.rotateX(p5.frameCount * 0.005);
		p5.rotateY(p5.frameCount * 0.005);
		p5.orbitControl();
		p5.box(150, 150, 150, 10, 10);
		p5.pop();
	};
};

export default function Visuals() {
	return (
		<main>
			<div className="canvasDiv">
				<P5Canvas sketch={sketch} />
			</div>
		</main>
	)
}

