<script>
	import { Buffer } from 'buffer';
	import FileDropper from '../components/file-dropper.svelte';
	import { handleFiles } from '../lib/file-handler.js';
	import { metadataStore } from '../stores/metadata-store.js';
	import { coverStore } from '../stores/cover-store.js';

	function getImageUrl(image) {
		if (!image) return 'https://via.placeholder.com/250';
		const { mime, imageBuffer } = image;
		const base64 = Buffer.from(imageBuffer).toString('base64');
		return `data:${mime};base64,${base64}`;
	}

	$: imgSource = getImageUrl($coverStore);
</script>

<FileDropper {handleFiles}>
	<div class="container mx-auto mb-8">
		<div class="flex mb-4">
			<img src={imgSource} alt="Cover" class="w-52 h-52" />
			<div class="flex flex-col flex-1 gap-4 m-8">
				<input
					class="bg-slate-800 text-3xl px-4 py-2 w-full"
					type="text"
					placeholder="Title"
					bind:value={$metadataStore.title}
				/>
				<input
					class="bg-slate-800 text-xl px-4 py-2 w-full"
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
			{#each $metadataStore.chapter || [] as chapter, i}
				<tr class="hover:bg-slate-100 hover:text-black">
					<td class="text-right">{i + 1}</td>
					<td>
						<input
							class="bg-slate-800 text-xl px-4 py-2 w-full text-white"
							type="text"
							placeholder="Title"
							bind:value={$metadataStore.chapter[i].tags.title}
						/>
					</td>
					<td>
						<input
							class="bg-slate-800 text-xl px-4 py-2 w-full text-white"
							type="text"
							placeholder="Start"
							bind:value={$metadataStore.chapter[i].startTimeMs}
						/>
					</td>
					<td>
						<input
							class="bg-slate-800 text-xl px-4 py-2 w-full text-white"
							type="text"
							placeholder="End"
							bind:value={$metadataStore.chapter[i].endTimeMs}
						/>
					</td>
				</tr>
			{/each}
		</table>

		<!-- <pre>
      {JSON.stringify($metadataStore, null, 2)}
    </pre> -->
	</div>
</FileDropper>
