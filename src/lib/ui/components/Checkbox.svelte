<script lang="ts">
	import { Check, Minus } from '$lib/ui/icons';
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		checked = $bindable(false),
		indeterminate = false,
		class: className = '',
		...rest
	}: HTMLInputAttributes & {
		checked?: boolean;
		indeterminate?: boolean;
	} = $props();
</script>

<label class={`checkbox-wrap ${className}`} data-slot="checkbox">
	<input type="checkbox" class="checkbox-input" {checked} bind:indeterminate {...rest} />
	<span class="checkbox-box">
		{#if indeterminate}
			<Minus size={14} />
		{:else if checked}
			<Check size={14} />
		{/if}
	</span>
</label>

<style>
	.checkbox-wrap {
		display: inline-flex;
		flex-shrink: 0;
		cursor: pointer;
		line-height: 0;
	}

	.checkbox-input {
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

	.checkbox-box {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		height: 16px;
		flex-shrink: 0;
		border-radius: 4px;
		border: 1px solid var(--input);
		background: transparent;
		box-shadow: var(--shadow-xs);
		color: transparent;
		transition:
			background-color 0.15s ease,
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.checkbox-input:checked + .checkbox-box,
	.checkbox-input:indeterminate + .checkbox-box {
		background: var(--primary);
		border-color: var(--primary);
		color: var(--primary-foreground);
	}

	.checkbox-input:focus-visible + .checkbox-box {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.checkbox-wrap:has(.checkbox-input:disabled) {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
