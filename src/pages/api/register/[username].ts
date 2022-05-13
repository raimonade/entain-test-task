import type { NextApiRequest, NextApiResponse } from 'next';
import axios, { AxiosResponse } from 'axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	// send request to server /register with username
	const { username } = req.query as { username: string };
	console.log('APIURL', process.env.SOCKET_URL);
	console.log('username', username);
	try {
		const fetchedData: AxiosResponse = await axios.post(`${process.env.SOCKET_URL}/register`, {
			data: username,
		});
		console.log('data');
		const data = fetchedData.data;
		res.status(200).json(data);
	} catch (error) {
		// console.error(error);
		res.status(error?.status || 500).end(error.message);
	}
}
