<script lang="ts">
	let {
		size = 16,
		class: className = '',
		strokeWidth = 2
	}: { size?: number; class?: string; strokeWidth?: number } = $props();
</script>

<svg
	class={`icon ${className}`}
	width={size}
	height={size}
	viewBox="0 0 24 24"
	fill="none"
	stroke="currentColor"
	stroke-width={strokeWidth}
	stroke-linecap="round"
	stroke-linejoin="round"
	aria-hidden="true"
>
	<path d="m15 18-6-6 6-6" />
</svg>

<style>
	.icon {
		flex-shrink: 0;
	}
</style>
