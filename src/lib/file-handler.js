import { readTags, setAudioBuffer } from './id3';
import { metadataStore, coverStore, chaptersStore } from '../stores/metadata-store';

export async function handleFiles(files) {
	if (files.length === 0) {
		return;
	}
	const file = files[0];
	console.log(file);

	switch (true) {
		case ['image/jpeg', 'image/png'].includes(file.type):
			await processImage(file);
			break;
		case file.type === 'audio/mpeg':
			await processAudio(file);
			break;
	}

	if (file.type === 'image/png') {
		// const image = await createImageBitmap(file);
		// const canvas = document.createElement('canvas');

		return;
	} else if (file.type === 'audio/mpeg') {
		return;
	}
}

async function processImage(file) {}

async function processAudio(file) {
	const fileBuffer = await file.arrayBuffer();
	setAudioBuffer(fileBuffer);
	const tags = readTags();

	coverStore.set(tags.image);

	const title = tags.title ? tags.title : file.name.replace('.mp3', '');
	const artist = tags.artist ? tags.artist : '';
	metadataStore.set({
		filename: file.name,
		title,
		artist
	});
	if (tags.chapter) {
		chaptersStore.set(tags.chapter);
	}
}
