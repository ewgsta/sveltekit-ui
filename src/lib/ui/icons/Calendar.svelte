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
	<path d="M8 2v4" />
	<path d="M16 2v4" />
	<rect width="18" height="18" x="3" y="4" rx="2" />
	<path d="M3 10h18" />
</svg>

<style>
	.icon {
		flex-shrink: 0;
	}
</style>
