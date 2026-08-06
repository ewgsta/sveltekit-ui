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
		gap: var(--space-2);
		white-space: nowrap;
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1;
		border: 1px solid transparent;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease,
			opacity 0.15s ease;
		outline: none;
		flex-shrink: 0;
	}

	.button:disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	.button:focus-visible {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px rgb(0 0 0 / 0.08);
	}

	/* variants */
	.button--default {
		background: var(--primary);
		color: var(--primary-foreground);
		box-shadow: var(--shadow-xs);
	}

	.button--default:hover:not(:disabled) {
		opacity: 0.9;
	}

	.button--destructive {
		background: var(--destructive);
		color: #fff;
		box-shadow: var(--shadow-xs);
	}

	.button--destructive:hover:not(:disabled) {
		opacity: 0.9;
	}

	.button--outline {
		border: 1px solid var(--border);
		background: var(--background);
		color: var(--foreground);
		box-shadow: var(--shadow-xs);
	}

	.button--outline:hover:not(:disabled) {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.button--secondary {
		background: var(--secondary);
		color: var(--secondary-foreground);
		box-shadow: var(--shadow-xs);
	}

	.button--secondary:hover:not(:disabled) {
		opacity: 0.8;
	}

	.button--ghost {
		background: transparent;
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
	}

	.button--link:hover:not(:disabled) {
		text-decoration: underline;
	}

	/* sizes */
	.button--default {
		height: 2.25rem;
		padding: 0 var(--space-4);
	}

	.button--sm {
		height: 2rem;
		border-radius: var(--radius-sm);
		padding: 0 var(--space-3);
		font-size: 0.813rem;
	}

	.button--lg {
		height: 2.5rem;
		border-radius: var(--radius-md);
		padding: 0 var(--space-6);
	}

	.button--icon {
		height: 2.5rem;
		width: 2.5rem;
		padding: 0;
	}

	.button--icon-sm {
		height: 2rem;
		width: 2rem;
		padding: 0;
	}

	.button--auto {
		height: auto;
		padding: 0;
	}
</style>
