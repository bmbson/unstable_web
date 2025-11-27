import React from "react";
import './carousel_indicator.css';
import { FaRegCirclePause, FaRegCirclePlay } from "react-icons/fa6";
import { useUIHelperStore } from "@/uiStore";

function CarouselIndicator({ elementAmount, currentIndex, pauseButton, status }: { elementAmount: any, currentIndex: any, pauseButton: any, status: boolean }) {

	const { isBottomBarActive, setIsBottomBarActive } = useUIHelperStore();

	function createElements() {
		let elements = [];

		for (let i = 0; i < elementAmount; i++) {
			elements.push(
				<div key={i} className="dot" style={{
					backgroundColor: currentIndex == i ? "white" : "grey",
				}}></div>
			);
		}
		return elements;
	}

	return (
		<div>
			<div id="carouselIndicator"
				style={{
					bottom: !isBottomBarActive ? "" : "0px",
					transition: "bottom 0.3s ease",
				}}
			>
				{status == true ? <FaRegCirclePause className="button" onClick={pauseButton} ></FaRegCirclePause>
					: <FaRegCirclePlay className="button" onClick={pauseButton} ></FaRegCirclePlay>}
				{
					createElements()
				}
			</div>
		</div >
	);
};

export default CarouselIndicator
