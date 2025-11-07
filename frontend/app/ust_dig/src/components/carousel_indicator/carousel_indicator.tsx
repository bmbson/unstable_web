import React from "react";
import './carousel_indicator.css';

function CarouselIndicator({ elementAmount, currentIndex }: { elementAmount: any, currentIndex: any }) {
	function createElements() {
		let elements = [];

		for (let i = 0; i < elementAmount; i++) {
			elements.push(
				<div key={i} className="dot"></div>
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
