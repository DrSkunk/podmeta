import { Buffer } from 'buffer';
import NodeID3 from 'node-id3';

let audioBuffer = null;

export function setAudioBuffer(buffer) {
	audioBuffer = buffer;
}

export function getAudioBuffer() {
	return audioBuffer;
}

export function readTags() {
	if (!audioBuffer) {
		throw new Error('No audio buffer set');
	}
	const tags = NodeID3.read(Buffer.from(audioBuffer), {
		noRaw: true
	});
	return tags;
}

export function writeTags(tags) {
	if (!audioBuffer) {
		throw new Error('No audio buffer set');
	}
	const newBuffer = NodeID3.write(tags, Buffer.from(audioBuffer));
	return newBuffer;
}
