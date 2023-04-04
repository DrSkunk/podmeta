<script>
	import { onMount, onDestroy } from 'svelte';
	import { browser } from '$app/environment';

	let state = 'idle';
	export let handleFiles;

	function classNames(...classes) {
		return classes.filter(Boolean).join(' ');
	}

	onMount(() => {
		['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
			document.addEventListener(eventName, preventDefaults);
		});
		document.addEventListener('drop', handleDrop);

		document.addEventListener('dragenter', () => {
			state = 'hover';
		});
	});

	onDestroy(() => {
		if (!browser) {
			return;
		}
		['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
			document.removeEventListener(eventName, preventDefaults);
		});
		document.removeEventListener('drop', handleDrop);
	});

	function preventDefaults(e) {
		e.preventDefault();
		e.stopPropagation();
	}

	async function handleDrop(e) {
		state = 'busy';

		let dt = e.dataTransfer;
		let files = dt.files;
		await handleFiles(files);

		state = 'done';
		setTimeout(() => {
			state = 'idle';
		}, 1000);
	}
</script>

<div
	class={classNames(
		'border-4 border-dashed',
		'absolute inset-4 rounded-xl',
		'transition-all duration-300 ease-in-out',
		state === 'idle' && 'border-transparent',
		state === 'hover' && 'border-gray-300',
		state === 'busy' && 'border-yellow-300',
		state === 'done' && 'border-green-300'
	)}
>
	{#if state === 'hover'}
		<div
			class="absolute flex inset-0 bg-blue-500 bg-opacity-60 justify-center items-center text-lg rounded-xl"
		>
			<h1>Drop a file here</h1>
		</div>
	{/if}
	<slot />
</div>
