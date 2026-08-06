<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className = '',
		children,
		...rest
	}: HTMLAttributes<HTMLSpanElement> & {
		children?: Snippet;
	} = $props();
</script>

<span class={`avatar ${className}`} data-slot="avatar" {...rest}>
	{@render children?.()}
</span>

<style>
	.avatar {
		position: relative;
		display: flex;
		width: 32px;
		height: 32px;
		flex-shrink: 0;
		overflow: hidden;
		border-radius: 9999px;
	}

	.avatar :global(img) {
		width: 100%;
		height: 100%;
		aspect-ratio: 1;
		object-fit: cover;
	}
</style>
