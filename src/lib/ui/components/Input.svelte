<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let { class: className = '', ...rest }: HTMLInputAttributes = $props();
</script>

<input data-slot="input" class={`input ${className}`} {...rest} />

<style>
	.input {
		display: flex;
		width: 100%;
		min-width: 0;
		height: 36px;
		flex-shrink: 0;
		border-radius: var(--radius-md);
		border: 1px solid var(--input);
		background: transparent;
		padding: 4px 12px;
		font-size: 1rem;
		line-height: 1;
		box-shadow: var(--shadow-xs);
		outline: none;
		transition:
			color 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
	}

	.input::placeholder {
		color: var(--muted-foreground);
	}

	.input:focus-visible {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.input:disabled {
		pointer-events: none;
		cursor: not-allowed;
		opacity: 0.5;
	}

	@media (min-width: 768px) {
		.input {
			font-size: 0.875rem;
		}
	}
</style>
