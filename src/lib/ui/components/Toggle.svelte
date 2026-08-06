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
	data-slot="toggle"
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
		gap: 8px;
		white-space: nowrap;
		border-radius: var(--radius-md);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		outline: none;
		transition:
			color 0.15s ease,
			box-shadow 0.15s ease;
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
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.toggle--pressed {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.toggle--outline {
		border: 1px solid var(--input);
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
		height: 36px;
		padding: 0 8px;
		min-width: 36px;
	}

	.toggle--sm {
		height: 32px;
		gap: 6px;
		padding: 0 6px;
		min-width: 32px;
	}

	.toggle--lg {
		height: 40px;
		padding: 0 10px;
		min-width: 40px;
	}

	.toggle--icon {
		width: 36px;
		height: 36px;
		padding: 0;
	}

	.toggle--icon-sm {
		width: 32px;
		height: 32px;
		padding: 0;
	}

	.toggle--auto {
		height: auto;
		padding: 0;
	}

	.toggle :global(svg) {
		width: 16px;
		height: 16px;
		flex-shrink: 0;
	}
</style>
