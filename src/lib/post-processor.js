import { metadataStore } from '../stores/metadata-store';
import { writeTags } from './id3';
import { get } from 'svelte/store';

export function generateBlob() {
	const metadata = get(metadataStore);

	const tags = {
		title: metadata.title,
		artist: metadata.artist
	};

	const buffer = writeTags(tags);

	return new Blob([buffer], { type: 'audio/mpeg' });
}
