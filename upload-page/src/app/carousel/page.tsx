"use client"
import Link from 'next/link'
import useSWR from 'swr';

export default function Carousel() {
	function uploadCarousel(formData: FormData) {
		fetch("http://10.1.0.10:9999/uploadcarousel", {
			method: "POST",
			headers: {
				"Access-Control-Allow-Origin": " http://10.1.0.10:9999"
			},
			body: formData
		})
	};

	const fetcher = (url: any) => fetch(url).then((res) => res.json())
	const { data, error, isLoading } = useSWR('http://10.1.0.10:9999/getmixes', fetcher, {
		revalidateOnFocus: false,
		revalidateOnReconnect: false,
		revalidateIfStale: false,
	});


	return (
		<div className="flex-col items-center ">
			<Link className="text-3xl font-bold underline " href="/carousel" >Carousel</Link>
			<Link className="text-3xl font-bold underline " href="/" >Home</Link>
			<form id="CarouselForm" action={uploadCarousel}>
				<h1> Upload </h1>
				<p>Mix Name</p>
				<select name='select_mix_link' id='select_mix_link'>
					{data && data.map((item: any) => (
						<option key={item.id} value={item.mix_title}>{item.mix_title}</option>
					))}
				</select>
				<p>Image Source</p>
				<input type="file" name="image_file" required></input>
				<input type="submit"></input>
			</form>
		</div >
	);
}
