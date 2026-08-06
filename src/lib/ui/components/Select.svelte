<script lang="ts">
	import { Chevron } from '$lib/ui/icons';
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	let {
		class: className = '',
		placeholder = '',
		children,
		...rest
	}: HTMLSelectAttributes & {
		placeholder?: string;
		children?: Snippet;
	} = $props();
</script>

<div class={`select ${className}`}>
	<select class="select-input" {...rest}>
		{#if placeholder}
			<option value="" disabled selected hidden>{placeholder}</option>
		{/if}
		{@render children?.()}
	</select>
	<span class="select-chevron"><Chevron size={16} /></span>
</div>

<style>
	.select {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
	}

	.select-input {
		width: 100%;
		min-width: 0;
		height: 2.25rem;
		padding: 0 var(--space-6) 0 var(--space-3);
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		background: var(--background);
		color: var(--foreground);
		font-size: 0.875rem;
		line-height: 1;
		box-shadow: var(--shadow-xs);
		outline: none;
		cursor: pointer;
		appearance: none;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.select-input:focus-visible {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px rgb(0 0 0 / 0.08);
	}

	.select-input:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.select-chevron {
		position: absolute;
		right: var(--space-2);
		pointer-events: none;
		color: var(--muted-foreground);
		display: inline-flex;
	}
</style>
