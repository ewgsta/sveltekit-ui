<script lang="ts">
	let {
		value = 0,
		max = 100,
		class: className = ''
	}: { value?: number; max?: number; class?: string } = $props();

	const percentage = $derived(
		max > 0 ? Math.min(Math.max((Number(value) / max) * 100, 0), 100) : 0
	);
</script>

<div
	class={`progress ${className}`}
	role="progressbar"
	aria-valuenow={value}
	aria-valuemin={0}
	aria-valuemax={max}
>
	<div class="progress-indicator" style={`width: ${percentage}%`}></div>
</div>

<style>
	.progress {
		position: relative;
		height: 0.5rem;
		width: 100%;
		overflow: hidden;
		border-radius: 9999px;
		background: color-mix(in srgb, var(--primary) 20%, transparent);
	}

	.progress-indicator {
		height: 100%;
		border-radius: 9999px;
		background: var(--primary);
		transition: width 0.3s ease;
	}
</style>
