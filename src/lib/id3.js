import { Buffer } from 'buffer';
import NodeID3 from 'node-id3';

export function readTags(fileBuffer) {
	const tags = NodeID3.read(Buffer.from(fileBuffer), {
		noRaw: true
	});
	return tags;
}
