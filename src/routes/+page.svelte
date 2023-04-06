<script>
	import { Buffer } from 'buffer';
	import FileDropper from '../components/file-dropper.svelte';
	import { handleFiles } from '../lib/file-handler.js';
	import { metadataStore, chaptersStore, coverStore } from '../stores/metadata-store.js';
	import Download from '../components/download.svelte';

	function getImageUrl(image) {
		if (!image) return 'https://via.placeholder.com/250';
		const { mime, imageBuffer } = image;
		const base64 = Buffer.from(imageBuffer).toString('base64');
		return `data:${mime};base64,${base64}`;
	}

	function addChapter() {}

	function download() {}

	$: imgSource = getImageUrl($coverStore);
</script>

<FileDropper {handleFiles}>
	<div class="container mx-auto mb-8">
		<div class="flex mb-4">
			<img src={imgSource} alt="Cover" class="w-52 h-52" />
			<div class="flex flex-col flex-1 gap-4 m-8">
				<input
					class="bg-gray-100 dark:bg-slate-800 text-3xl px-4 py-2 w-full"
					type="text"
					placeholder="Title"
					bind:value={$metadataStore.title}
				/>
				<input
					class="bg-gray-100 dark:bg-slate-800 text-xl px-4 py-2 w-full"
					type="text"
					placeholder="Artist"
					bind:value={$metadataStore.artist}
				/>
			</div>
		</div>

		<table class="mx-auto">
			<tr>
				<th class="">Chapter</th>
				<th>Title</th>
				<th>Start</th>
				<th>End</th>
			</tr>
			{#each $chaptersStore as chapter, i}
				<tr class="hover:bg-gray-200 dark:hover:bg-slate-100 dark:hover:text-black">
					<td class="text-right">{i + 1}</td>
					<td>
						<input
							class="dark:bg-slate-800 text-xl px-4 py-2 w-full dark:text-white"
							type="text"
							placeholder="Title"
							bind:value={$chaptersStore[i].tags.title}
						/>
					</td>
					<td>
						<input
							class="dark:bg-slate-800 text-xl px-4 py-2 w-full dark:text-white"
							type="text"
							placeholder="Start"
							bind:value={$chaptersStore[i].startTimeMs}
						/>
					</td>
					<td>
						<input
							class="dark:bg-slate-800 text-xl px-4 py-2 w-full dark:text-white"
							type="text"
							placeholder="End"
							bind:value={$chaptersStore[i].endTimeMs}
						/>
					</td>
				</tr>
			{/each}
		</table>
		<div class="flex gap-4">
			<button
				type="button"
				class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
				on:click={addChapter}
			>
				Add chapter
			</button>

			<Download />
		</div>

		<pre>
      {JSON.stringify($metadataStore, null, 2)}
    </pre>
	</div>
</FileDropper>
