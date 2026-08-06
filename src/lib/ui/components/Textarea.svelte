<script lang="ts">
	import type { HTMLTextareaAttributes } from 'svelte/elements';

	let {
		class: className = '',
		rows = 3,
		...rest
	}: HTMLTextareaAttributes & { rows?: number } = $props();
</script>

<textarea data-slot="textarea" class={`textarea ${className}`} {rows} {...rest}></textarea>

<style>
	.textarea {
		display: flex;
		width: 100%;
		min-width: 0;
		min-height: 64px;
		flex-shrink: 0;
		border-radius: var(--radius-md);
		border: 1px solid var(--input);
		background: transparent;
		padding: 8px 12px;
		font-size: 1rem;
		line-height: 1.5;
		overflow: auto;
		box-shadow: var(--shadow-xs);
		outline: none;
		transition:
			color 0.15s ease,
			box-shadow 0.15s ease,
			border-color 0.15s ease;
	}

	.textarea::placeholder {
		color: var(--muted-foreground);
	}

	.textarea:focus-visible {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.textarea:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	@media (min-width: 768px) {
		.textarea {
			font-size: 0.875rem;
		}
	}
</style>
