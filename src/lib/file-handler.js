import { readTags } from './id3';
import { metadataStore } from '../stores/metadata-store';
import { coverStore } from '../stores/cover-store';

export async function handleFiles(files) {
	if (files.length === 0) {
		return;
	}
	const file = files[0];
	console.log(file);
	if (file.type === 'image/png') {
		// const image = await createImageBitmap(file);
		// const canvas = document.createElement('canvas');

		return;
	} else if (file.type === 'audio/mpeg') {
		const fileBuffer = await file.arrayBuffer();
		const tags = readTags(fileBuffer);
		console.log(tags);
		coverStore.set(tags.image);

		delete tags.image;
		metadataStore.set(tags);

		return;
	}
}
