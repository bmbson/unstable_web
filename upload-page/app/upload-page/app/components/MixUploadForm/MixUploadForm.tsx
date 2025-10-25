"use client";
import "./style.css"

export default function MixUploadForm() {
	function uploadMix(formData: FormData) {

		fetch("http://10.1.0.10:9999/", {
			method: "POST",
			headers: {
				"Access-Control-Allow-Origin": "http://10.1.0.10:9999/",
			},
			body: formData
		})
	};


	return (
		<div>
			<form id="MixUploadForm" action={uploadMix}>
				<h1> Upload Form </h1>
				<p>Mix Name</p>
				<input type="text" name="mixTitle" placeholder="Enter Mix Name" required />
				<p>Creator Name</p>
				<input type="text" name="mixCreator" placeholder="Enter Mix Maker" required />
				<p>Audio Upload</p>
				<input type="file" name="audioFile" id="audioFile" required />
				<p>Image Upload</p>
				<input type="file" name="imageFile" id="imageFile" required />
				<button type="submit">Upload Mix</button>
			</form>
		</div>
	);
}
