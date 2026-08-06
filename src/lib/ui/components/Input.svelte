<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	type Size = 'sm' | 'default';

	let {
		size = 'default',
		class: className = '',
		...rest
	}: Omit<HTMLInputAttributes, 'size'> & { size?: Size } = $props();
</script>

<input class={`input input--${size} ${className}`} {...rest} />

<style>
	.input {
		display: flex;
		width: 100%;
		min-width: 0;
		height: 2.25rem;
		flex-shrink: 0;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		background: transparent;
		padding: 0.25rem var(--space-3);
		font-size: 0.875rem;
		line-height: 1;
		box-shadow: var(--shadow-xs);
		outline: none;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.input::placeholder {
		color: var(--muted-foreground);
	}

	.input:focus-visible {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px rgb(0 0 0 / 0.08);
	}

	.input:disabled {
		pointer-events: none;
		cursor: not-allowed;
		opacity: 0.5;
	}

	.input--default {
		border-radius: var(--radius-md);
	}

	.input--sm {
		height: 2rem;
		border-radius: var(--radius-sm);
	}
</style>
