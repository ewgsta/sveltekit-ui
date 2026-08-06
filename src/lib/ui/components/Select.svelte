<script lang="ts">
	import { Chevron } from '$lib/ui/icons';
	import type { Snippet } from 'svelte';
	import type { HTMLSelectAttributes } from 'svelte/elements';

	type Size = 'sm' | 'default';

	let {
		size = 'default',
		value = $bindable(''),
		class: className = '',
		placeholder = '',
		children,
		...rest
	}: Omit<HTMLSelectAttributes, 'size' | 'value'> & {
		size?: Size;
		value?: string;
		placeholder?: string;
		children?: Snippet;
	} = $props();
</script>

<div class={`select select--${size} ${className}`}>
	<select class="select-input" data-slot="select-trigger" bind:value {...rest}>
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
		height: 36px;
		padding: 0 28px 0 12px;
		border-radius: var(--radius-md);
		border: 1px solid var(--input);
		background: var(--background);
		color: var(--foreground);
		font-size: 0.875rem;
		white-space: nowrap;
		box-shadow: var(--shadow-xs);
		outline: none;
		cursor: pointer;
		appearance: none;
		transition:
			color 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
	}

	.select--sm .select-input {
		height: 32px;
	}

	.select-input:focus-visible {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.select-input:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.select-chevron {
		position: absolute;
		right: 8px;
		display: inline-flex;
		pointer-events: none;
		color: var(--muted-foreground);
		opacity: 0.5;
	}
</style>
