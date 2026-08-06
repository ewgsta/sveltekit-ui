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
		display: inline-flex;
		width: 2rem;
		height: 2rem;
		flex-shrink: 0;
		overflow: hidden;
		border-radius: 9999px;
	}

	.avatar :global(img) {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
