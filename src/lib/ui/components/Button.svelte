<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
	type Size = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'auto';

	let {
		variant = 'default',
		size = 'default',
		disabled = false,
		type = 'button',
		class: className = '',
		children,
		...rest
	}: HTMLButtonAttributes & {
		variant?: Variant;
		size?: Size;
		children?: Snippet;
	} = $props();
</script>

<button
	data-slot="button"
	class={`button button--${variant} button--${size} ${className}`}
	{type}
	{disabled}
	{...rest}
>
	{@render children?.()}
</button>

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		white-space: nowrap;
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 500;
		color: var(--foreground);
		border: 1px solid transparent;
		cursor: pointer;
		transition: all 0.15s ease;
		outline: none;
		flex-shrink: 0;
		box-shadow: var(--shadow-xs);
	}

	.button:disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	.button:focus-visible {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	/* variants */
	.button--default {
		background: var(--primary);
		color: var(--primary-foreground);
	}

	.button--default:hover:not(:disabled) {
		opacity: 0.9;
	}

	.button--destructive {
		background: var(--destructive);
		color: #fff;
	}

	.button--destructive:hover:not(:disabled) {
		opacity: 0.9;
	}

	.button--outline {
		border-color: var(--input);
		background: var(--background);
	}

	.button--outline:hover:not(:disabled) {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.button--secondary {
		background: var(--secondary);
		color: var(--secondary-foreground);
	}

	.button--secondary:hover:not(:disabled) {
		opacity: 0.8;
	}

	.button--ghost {
		background: transparent;
		box-shadow: none;
		color: var(--foreground);
	}

	.button--ghost:hover:not(:disabled) {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.button--link {
		background: transparent;
		color: var(--primary);
		text-underline-offset: 4px;
		box-shadow: none;
	}

	.button--link:hover:not(:disabled) {
		text-decoration: underline;
	}

	/* sizes */
	.button--default {
		height: 36px;
		padding: 0 16px;
	}

	.button--sm {
		height: 32px;
		gap: 6px;
		border-radius: var(--radius-md);
		padding: 0 12px;
	}

	.button--lg {
		height: 40px;
		border-radius: var(--radius-md);
		padding: 0 24px;
	}

	.button--icon {
		height: 40px;
		width: 40px;
		padding: 0;
	}

	.button--icon-sm {
		height: 32px;
		width: 32px;
		padding: 0;
	}

	.button--auto {
		height: auto;
		padding: 0;
	}

	.button :global(svg) {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}
</style>
