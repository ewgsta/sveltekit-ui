<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let {
		class: className = '',
		rows = 3,
		...rest
	}: HTMLTextareaAttributes & { rows?: number } = $props();
</script>

<textarea class={`textarea ${className}`} {rows} {...rest} />

<style>
	.textarea {
		display: block;
		width: 100%;
		min-width: 0;
		min-height: 4rem;
		flex-shrink: 0;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		background: transparent;
		padding: var(--space-2) var(--space-3);
		font-size: 0.875rem;
		line-height: 1.5;
		overflow: auto;
		box-shadow: var(--shadow-xs);
		outline: none;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease,
			height 0.15s ease;
	}

	.textarea::placeholder {
		color: var(--muted-foreground);
	}

	.textarea:focus-visible {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px rgb(0 0 0 / 0.08);
	}

	.textarea:disabled {
		pointer-events: none;
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
