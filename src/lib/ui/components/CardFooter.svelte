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

<div class={`card-footer ${className}`} data-slot="card-footer" {...rest}>
	{@render children?.()}
</div>

<style>
	.card-footer {
		display: flex;
		align-items: center;
		padding: 0 var(--space-4) var(--space-4);
	}

	.card-footer:is(:only-child) {
		padding-top: var(--space-4);
	}
</style>
