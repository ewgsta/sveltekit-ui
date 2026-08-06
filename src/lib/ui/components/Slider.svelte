<script lang="ts">
	import type { HTMLInputAttributes } from 'svelte/elements';

	let {
		min = 0,
		max = 100,
		step = 1,
		value = $bindable(0),
		class: className = '',
		...rest
	}: Omit<HTMLInputAttributes, 'value' | 'min' | 'max' | 'step'> & {
		min?: number;
		max?: number;
		step?: number;
		value?: number;
	} = $props();

	const percentage = $derived(max > min ? ((Number(value) - min) / (max - min)) * 100 : 0);
</script>

<div class={`slider ${className}`}>
	<input
		type="range"
		class="slider-input"
		{min}
		{max}
		{step}
		bind:value
		{...rest}
		style={`--slider-progress: ${percentage}%`}
	/>
</div>

<style>
	.slider {
		display: inline-flex;
		flex-shrink: 0;
		align-items: center;
		width: 100%;
		touch-action: none;
	}

	.slider-input {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 0.5rem;
		margin: 0.5rem 0;
		border-radius: var(--radius-sm);
		background: linear-gradient(
			to right,
			var(--primary) 0%,
			var(--primary) var(--slider-progress),
			var(--secondary) var(--slider-progress),
			var(--secondary) 100%
		);
		cursor: pointer;
		outline: none;
	}

	.slider-input::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 1rem;
		height: 1rem;
		border-radius: 9999px;
		background: var(--background);
		border: 2px solid var(--primary);
		box-shadow: var(--shadow-xs);
		transition: box-shadow 0.15s ease;
	}

	.slider-input::-moz-range-thumb {
		width: 1rem;
		height: 1rem;
		border-radius: 9999px;
		background: var(--background);
		border: 2px solid var(--primary);
		box-shadow: var(--shadow-xs);
	}

	.slider-input:focus-visible::-webkit-slider-thumb {
		box-shadow: 0 0 0 3px rgb(0 0 0 / 0.1);
	}

	.slider-input:focus-visible::-moz-range-thumb {
		box-shadow: 0 0 0 3px rgb(0 0 0 / 0.1);
	}

	.slider-input:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}
</style>
