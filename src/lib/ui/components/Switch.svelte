<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		checked = false,
		class: className = '',
		...rest
	}: HTMLInputAttributes & { checked?: boolean } = $props();
</script>

<label class={`switch-wrap ${className}`}>
	<input type="checkbox" role="switch" class="switch-input" {checked} {...rest} />
	<span class="switch-track">
		<span class="switch-thumb"></span>
	</span>
</label>

<style>
	.switch-wrap {
		display: inline-flex;
		flex-shrink: 0;
		cursor: pointer;
		line-height: 0;
	}

	.switch-input {
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

	.switch-track {
		display: inline-flex;
		align-items: center;
		width: 2rem;
		height: 1.15rem;
		flex-shrink: 0;
		border-radius: 9999px;
		border: 1px solid transparent;
		background: var(--input);
		box-shadow: var(--shadow-xs);
		transition: background-color 0.2s ease;
	}

	.switch-thumb {
		display: block;
		width: 1rem;
		height: 1rem;
		border-radius: 9999px;
		background: var(--background);
		box-shadow: 0 1px 2px rgb(0 0 0 / 0.2);
		transition: transform 0.2s ease;
	}

	.switch-input:checked + .switch-track {
		background: var(--primary);
	}

	.switch-input:checked + .switch-track .switch-thumb {
		transform: translateX(calc(100% - 2px));
	}

	.switch-input:focus-visible + .switch-track {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px rgb(0 0 0 / 0.08);
	}

	.switch-wrap:has(.switch-input:disabled) {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
