import { writable } from 'svelte/store';

export const metadataStore = writable({});
export const coverStore = writable(null);
export const chaptersStore = writable([]);
