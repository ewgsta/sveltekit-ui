<script lang="ts">
	import type { Snippet } from 'svelte';

	let { class: className = '', children }: { class?: string; children?: Snippet } = $props();
</script>

<div class={`dropdown-label ${className}`} role="presentation">
	{@render children?.()}
</div>

<style>
	.dropdown-label {
		padding: 6px 10px 4px;
		font-size: 0.75rem;
		font-weight: 500;
		color: var(--muted-foreground);
	}
</style>
