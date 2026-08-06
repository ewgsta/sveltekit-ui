<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		checked = false,
		class: className = '',
		...rest
	}: HTMLInputAttributes & { checked?: boolean } = $props();
</script>

<label class={`radio-wrap ${className}`}>
	<input type="radio" class="radio-input" {checked} {...rest} />
	<span class="radio-dot"></span>
</label>

<style>
	.radio-wrap {
		display: inline-flex;
		flex-shrink: 0;
		cursor: pointer;
		line-height: 0;
	}

	.radio-input {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}

	.radio-dot {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1rem;
		height: 1rem;
		flex-shrink: 0;
		border-radius: 9999px;
		border: 1px solid var(--border);
		background: transparent;
		box-shadow: var(--shadow-xs);
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.radio-dot::after {
		content: '';
		width: 0.375rem;
		height: 0.375rem;
		border-radius: 9999px;
		background: transparent;
		transition: background-color 0.15s ease;
	}

	.radio-input:checked + .radio-dot {
		border-color: var(--primary);
	}

	.radio-input:checked + .radio-dot::after {
		background: var(--primary);
	}

	.radio-input:focus-visible + .radio-dot {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px rgb(0 0 0 / 0.08);
	}

	.radio-wrap:has(.radio-input:disabled) {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
