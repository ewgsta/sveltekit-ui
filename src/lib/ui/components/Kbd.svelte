<script lang="ts">
	import type { Snippet } from 'svelte';

	let { class: className = '', children }: { class?: string; children?: Snippet } = $props();
</script>

<kbd class={`kbd ${className}`} data-slot="kbd">
	{@render children?.()}
</kbd>

<style>
	.kbd {
		display: inline-flex;
		align-items: center;
		gap: 4px;
		padding: 2px 6px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--border);
		border-bottom-width: 2px;
		background: var(--secondary);
		color: var(--secondary-foreground);
		font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
		font-size: 0.75rem;
		line-height: 1.4;
	}
</style>
