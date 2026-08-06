<script lang="ts">
	import { getContext } from 'svelte';
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	let {
		onSelect,
		inset = false,
		variant = 'default',
		disabled = false,
		class: className = '',
		children,
		...rest
	}: HTMLButtonAttributes & {
		onSelect?: () => void;
		inset?: boolean;
		variant?: 'default' | 'destructive';
		disabled?: boolean;
		children?: Snippet;
	} = $props();

	const menu = getContext<{ close: () => void }>('dropdown-menu');

	function handleClick() {
		if (disabled) return;
		onSelect?.();
		menu?.close();
	}
</script>

<button
	class={`dropdown-item dropdown-item--${variant} ${className}`}
	class:dropdown-item--inset={inset}
	type="button"
	role="menuitem"
	{disabled}
	onclick={handleClick}
	{...rest}
>
	{@render children?.()}
</button>

<style>
	.dropdown-item {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 6px 10px;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--popover-foreground);
		font-size: 0.875rem;
		text-align: left;
		cursor: pointer;
		outline: none;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.dropdown-item--inset {
		padding-left: 22px;
	}

	.dropdown-item:hover:not(:disabled) {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.dropdown-item:focus-visible {
		box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.dropdown-item--destructive {
		color: var(--destructive);
	}

	.dropdown-item--destructive:hover:not(:disabled) {
		background: var(--destructive);
		color: var(--destructive-foreground);
	}

	.dropdown-item:disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	.dropdown-item :global(svg) {
		flex-shrink: 0;
	}
</style>
