import postgres from 'postgres';
import { unstable_noStore as noStore } from 'next/cache';

const sql = postgres({
	host: '10.1.0.20',            // Postgres ip address[s] or domain name[s]
	port: 5432,          // Postgres server port[s]
	database: 'db',            // Name of database to connect to
	username: 'changeme',            // Username of database user
	password: 'changeme',            // Password of database user
})

export type MixTyping = {
	id: number;
	mix_audio_location: string;
	mix_title: string;
	mix_picture_location: string;
	mix_creator: string;
	genres: string;
};

export async function fetchTest() {
	noStore();

	try {
		const data = await sql<MixTyping[]>`SELECT * FROM "mix"`;
		return data;
	} catch (error) {
		console.error('Database Error:', error)
		throw new Error('Failed to fetch mix data.');
	}
};
