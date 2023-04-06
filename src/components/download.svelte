<script>
	import { metadataStore } from '../stores/metadata-store';
	import { get } from 'svelte/store';
	import { generateBlob } from '../lib/post-processor';
	let loading = false;
	let downloadAnchor = null;

	function download() {
		loading = true;
		const blob = generateBlob();
		const { filename } = get(metadataStore);
		console.log(downloadAnchor);
		downloadAnchor.href = URL.createObjectURL(blob);
		downloadAnchor.download = filename;
		downloadAnchor.click();
		loading = false;
	}
</script>

<button
	type="button"
	disabled={loading}
	class="inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
	class:cursor-not-allowed={loading}
	on:click={download}
>
	{#if loading}
		<svg
			class="animate-spin -ml-0.5 h-5 w-5 text-white"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
		>
			<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
			<path
				class="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
		Loading ...
	{:else}
		Download
	{/if}
</button>

<!-- svelte-ignore a11y-missing-attribute -->
<!-- svelte-ignore a11y-missing-content -->
<a bind:this={downloadAnchor} aria-hidden="true" />
