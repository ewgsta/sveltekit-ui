<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<div class={`skeleton ${className}`} data-slot="skeleton"></div>

<style>
	.skeleton {
		border-radius: var(--radius-sm);
		background: color-mix(in srgb, var(--muted-foreground) 20%, transparent);
		animation: skeleton-pulse 1.6s ease-in-out infinite;
	}

	@keyframes skeleton-pulse {
		0%,
		100% {
			opacity: 0.6;
		}
		50% {
			opacity: 1;
		}
	}
</style>
