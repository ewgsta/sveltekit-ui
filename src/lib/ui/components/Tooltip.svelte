<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		text,
		side = 'top',
		class: className = '',
		children
	}: {
		text?: string;
		side?: 'top' | 'bottom' | 'left' | 'right';
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<span class={`tooltip-wrap ${className}`} data-slot="tooltip-wrap">
	<span class="tooltip-trigger">{@render children?.()}</span>
	<span class={`tooltip tooltip--${side}`} role="tooltip" data-slot="tooltip-content">
		{text}
		<span class="tooltip-arrow"></span>
	</span>
</span>

<style>
	.tooltip-wrap {
		position: relative;
		display: inline-flex;
	}

	.tooltip {
		position: absolute;
		z-index: var(--z-tooltip);
		width: max-content;
		max-width: 16rem;
		padding: 6px 12px;
		border-radius: var(--radius-md);
		border: 1px solid var(--background);
		background: var(--sidebar);
		color: var(--sidebar-foreground);
		font-size: 0.75rem;
		text-align: center;
		opacity: 0;
		pointer-events: none;
		transition: opacity 0.15s ease;
	}

	.tooltip--top {
		bottom: calc(100% + 0.375rem);
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip--bottom {
		top: calc(100% + 0.375rem);
		left: 50%;
		transform: translateX(-50%);
	}

	.tooltip--left {
		right: calc(100% + 0.375rem);
		top: 50%;
		transform: translateY(-50%);
	}

	.tooltip--right {
		left: calc(100% + 0.375rem);
		top: 50%;
		transform: translateY(-50%);
	}

	.tooltip-wrap:hover .tooltip,
	.tooltip-wrap:focus-within .tooltip {
		opacity: 1;
	}

	.tooltip-arrow {
		position: absolute;
		width: 0.5rem;
		height: 0.5rem;
		transform: rotate(45deg);
		background: var(--sidebar);
		border-right: 1px solid var(--background);
		border-bottom: 1px solid var(--background);
		border-radius: 2px;
	}

	.tooltip--top .tooltip-arrow {
		top: calc(100% - 0.25rem);
		left: calc(50% - 0.25rem);
	}

	.tooltip--bottom .tooltip-arrow {
		top: -0.25rem;
		left: calc(50% - 0.25rem);
		transform: rotate(225deg);
	}

	.tooltip--left .tooltip-arrow {
		right: calc(100% - 0.25rem);
		top: calc(50% - 0.25rem);
		transform: rotate(135deg);
	}

	.tooltip--right .tooltip-arrow {
		left: -0.25rem;
		top: calc(50% - 0.25rem);
		transform: rotate(-45deg);
	}
</style>
