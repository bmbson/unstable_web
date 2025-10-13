"use client";
import "./style.css"

export default function MixUploadForm() {
	function uploadMix(formData: FormData) {
		console.log('attempting get request...');
		fetch("http://localhost:9999/", { method: "GET" })
			.then((response) => response.json())
			.then((json) => console.log(json));

		const mixTitle = formData.get("mixTitle");
		const mixCreator = formData.get("mixCreator");
		const audioFile = formData.get("audioFile");
		const imageFile = formData.get("imageFile");
	};


	return (
		<div>
			<form id="MixUploadForm" action={uploadMix}>
				<h1> Upload Form </h1>
				<p>Mix Name</p>
				<input type="text" name="mixTitle" placeholder="Enter Mix Name" required />
				<p>Creator Name</p>
				<input type="text" name="mixMaker" placeholder="Enter Mix Maker" required />
				<p>Audio Upload</p>
				<input type="file" name="audioFile" id="audioFile" required />
				<p>Image Upload</p>
				<input type="file" name="imageFile" id="imageFile" required />
				<button type="submit">Upload Mix</button>
			</form>
		</div>
	);
}
