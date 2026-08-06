<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'default' | 'outline';
	type Size = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'auto';

	let {
		pressed = false,
		variant = 'default',
		size = 'default',
		class: className = '',
		children,
		...rest
	}: HTMLButtonAttributes & {
		pressed?: boolean;
		variant?: Variant;
		size?: Size;
		children?: Snippet;
	} = $props();
</script>

<button
	class={`toggle toggle--${variant} toggle--${size} ${className}`}
	class:toggle--pressed={pressed}
	aria-pressed={pressed}
	{...rest}
>
	{@render children?.()}
</button>

<style>
	.toggle {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		white-space: nowrap;
		border-radius: var(--radius-md);
		border: 0;
		background: transparent;
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		outline: none;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease,
			opacity 0.15s ease;
	}

	.toggle:hover:not(:disabled) {
		background: var(--muted);
		color: var(--muted-foreground);
	}

	.toggle:disabled {
		pointer-events: none;
		opacity: 0.5;
	}

	.toggle:focus-visible {
		border: 1px solid var(--ring);
		box-shadow: 0 0 0 3px rgb(0 0 0 / 0.08);
	}

	.toggle--pressed {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.toggle--outline {
		border: 1px solid var(--border);
		background: transparent;
		box-shadow: var(--shadow-xs);
	}

	.toggle--outline:hover:not(:disabled) {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.toggle--outline.toggle--pressed {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	/* sizes */
	.toggle--default {
		height: 2.25rem;
		padding: 0 var(--space-2);
	}

	.toggle--sm {
		height: 2rem;
		padding: 0 0.375rem;
	}

	.toggle--lg {
		height: 2.5rem;
		padding: 0 0.625rem;
	}

	.toggle--icon {
		width: 2.25rem;
		height: 2.25rem;
		padding: 0;
	}

	.toggle--icon-sm {
		width: 2rem;
		height: 2rem;
		padding: 0;
	}

	.toggle--auto {
		height: auto;
		padding: 0;
	}
</style>
