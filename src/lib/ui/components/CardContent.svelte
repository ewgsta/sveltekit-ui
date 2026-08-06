<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className = '',
		children,
		...rest
	}: HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
	} = $props();
</script>

<div class={`card-content ${className}`} data-slot="card-content" {...rest}>
	{@render children?.()}
</div>

<style>
	.card-content {
		padding: 0 var(--space-4) var(--space-4);
	}

	.card-content:is(:only-child) {
		padding-top: var(--space-4);
	}
</style>
