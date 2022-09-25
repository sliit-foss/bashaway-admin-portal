import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);

const handler = async (req, res) => {
    const response = await fetch(decodeURIComponent(req.query.uri));
    if (!response.ok) throw new Error(`Unexpected response ${response.statusText}`);
    await pipeline(response.body, res);
};

export default handler;