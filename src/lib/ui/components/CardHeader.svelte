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

<div class={`card-header ${className}`} data-slot="card-header" {...rest}>
	{@render children?.()}
</div>

<style>
	.card-header {
		display: flex;
		flex-direction: column;
		gap: var(--space-1);
		padding: var(--space-4);
	}
</style>
