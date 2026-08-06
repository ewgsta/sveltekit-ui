<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type Variant = 'primary' | 'secondary' | 'ghost';

	let {
		variant = 'primary',
		type = 'button',
		disabled = false,
		class: className = '',
		children,
		...rest
	}: HTMLButtonAttributes & {
		variant?: Variant;
		children?: Snippet;
	} = $props();

	const variantClass: Record<Variant, string> = {
		primary: 'button--primary',
		secondary: 'button--secondary',
		ghost: 'button--ghost'
	};
</script>

<button {type} {disabled} class={`button ${variantClass[variant]} ${className}`} {...rest}>
	{@render children?.()}
</button>

<style>
	.button {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-2);
		padding: var(--space-2) var(--space-4);
		border-radius: var(--radius-md);
		border: 1px solid transparent;
		font: inherit;
		font-weight: 600;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			opacity 0.15s ease;
	}

	.button:disabled {
		opacity: 0.5;
		cursor: not-allowed;
	}

	.button--primary {
		background: var(--color-primary);
		color: #fff;
	}

	.button--primary:hover:not(:disabled) {
		background: var(--color-primary);
		filter: brightness(1.1);
	}

	.button--secondary {
		background: transparent;
		color: var(--color-text);
		border-color: var(--color-border);
	}

	.button--ghost {
		background: transparent;
		color: var(--color-primary);
	}
</style>
