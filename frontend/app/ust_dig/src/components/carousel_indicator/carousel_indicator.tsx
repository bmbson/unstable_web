import React from "react";
import './carousel_indicator.css';

function CarouselIndicator(num: number) {

	function createElements() {
		let elements = [];
		for (let i = 0; i < num; i++) {
			elements.push(
				<div key={num} className="dot">x</div>
			);
		}
		return elements;
	}


	return (
		<div>
			<div id="carouselIndicator">
				{
					createElements()
				}

			</div>
		</div>
	);
};

export default CarouselIndicator
