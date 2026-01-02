import Image from "next/image";
import Link from 'next/link'
import MixUploadForm from "./components/MixUploadForm/MixUploadForm";

export default function Home() {
	return (
		<div className="flex-col items-center ">
			<Link className="text-3xl font-bold underline " href="/carousel" >Carousel</Link>
			<Link className="text-3xl font-bold underline " href="/" >Home</Link>
			<div>
				<MixUploadForm />
			</div>
		</div>
	);
}
