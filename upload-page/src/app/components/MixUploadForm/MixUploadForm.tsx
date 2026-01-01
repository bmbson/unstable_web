"use client";
import "./style.css"

export default function MixUploadForm() {
	function uploadMix(formData: FormData) {

		fetch("http://10.1.0.10:9999/uploadmix", {
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
				<h1> Upload </h1>
				<p>Mix Name</p>
				<input type="text" name="mix_title" placeholder="Enter Mix Name" required />
				<p>Creator Name</p>
				<input type="text" name="mix_creator" placeholder="Enter Mix Maker" required />
				<p>Audio Upload</p>
				<input type="file" name="audio_file" id="audio_file" accept="audio/*" required />
				<p>Image Upload</p>
				<input type="file" name="image_file" id="image_file" accept="image/*" required />
				<p>Description</p>
				<input type="text" name="description" id="description" required />
				<button type="submit">Upload Mix</button>
			</form>
		</div>
	);
}
