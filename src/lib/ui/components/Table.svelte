<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLTableAttributes } from 'svelte/elements';

	let {
		class: className = '',
		children,
		...rest
	}: HTMLTableAttributes & { children?: Snippet } = $props();
</script>

<div class="table-wrap">
	<table class={`table ${className}`} data-slot="table" {...rest}>
		{@render children?.()}
	</table>
</div>

<style>
	.table-wrap {
		position: relative;
		width: 100%;
		overflow-x: auto;
	}

	.table {
		width: 100%;
		font-size: 0.875rem;
		border-collapse: collapse;
		caption-side: bottom;
	}

	.table :global(thead) {
		border-bottom: 1px solid var(--border);
	}

	.table :global(th) {
		padding: 0 0 var(--space-2);
		font-weight: 500;
		color: var(--muted-foreground);
		text-align: left;
		white-space: nowrap;
	}

	.table :global(td) {
		padding: var(--space-2) 0;
		vertical-align: middle;
	}

	.table :global(tbody tr) {
		border-bottom: 1px solid var(--border);
	}

	.table :global(tbody tr:last-child) {
		border-bottom: 0;
	}
</style>
