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

<div class={`card ${className}`} data-slot="card" {...rest}>
	{@render children?.()}
</div>

<style>
	.card {
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: var(--card);
		color: var(--card-foreground);
		box-shadow: var(--shadow-sm);
	}
</style>
