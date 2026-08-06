<script lang="ts">
	let {
		size = 16,
		class: className = '',
		strokeWidth = 2,
		up = false
	}: { size?: number; class?: string; strokeWidth?: number; up?: boolean } = $props();
</script>

<svg
	class={`icon icon-chevron ${className}`}
	class:icon-chevron--up={up}
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
	<path d="m6 9 6 6 6-6" />
</svg>

<style>
	.icon {
		flex-shrink: 0;
	}

	.icon-chevron--up {
		transform: rotate(180deg);
	}
</style>
