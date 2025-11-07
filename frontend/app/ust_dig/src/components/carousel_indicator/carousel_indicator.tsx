import React from "react";
import './carousel_indicator.css';

function CarouselIndicator({ elementAmount, currentIndex }: { elementAmount: any, currentIndex: any }) {
	console.log(elementAmount)
	function createElements() {
		let elements = [];
		for (let i = 0; i < elementAmount; i++) {
			elements.push(
				<div key={elementAmount} className="dot">x</div>
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
