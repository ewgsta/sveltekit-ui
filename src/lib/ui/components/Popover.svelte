<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		trigger,
		side = 'bottom',
		align = 'start',
		class: className = '',
		children
	}: {
		trigger: Snippet;
		side?: 'top' | 'bottom' | 'left' | 'right';
		align?: 'start' | 'end';
		class?: string;
		children?: Snippet;
	} = $props();

	let open = $state(false);
	let rootEl: HTMLDivElement;

	$effect(() => {
		if (!open) return;
		const onClick = (e: MouseEvent) => {
			if (rootEl && !rootEl.contains(e.target as Node)) open = false;
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') open = false;
		};
		document.addEventListener('pointerdown', onClick);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('pointerdown', onClick);
			document.removeEventListener('keydown', onKey);
		};
	});

	function onTriggerKey(e: KeyboardEvent) {
		if (e.key === 'Enter' || e.key === ' ') {
			e.preventDefault();
			open = !open;
		}
	}
</script>

<div class={`popover ${className}`} class:popover--open={open} bind:this={rootEl}>
	<div
		class="popover-trigger"
		role="button"
		tabindex="0"
		aria-haspopup="dialog"
		aria-expanded={open}
		onclick={() => (open = !open)}
		onkeydown={onTriggerKey}
	>
		{@render trigger()}
	</div>
	{#if open}
		<div
			class={`popover-panel popover-panel--${side} popover-panel--${align}`}
			role="dialog"
			tabindex="-1"
		>
			{@render children?.()}
		</div>
	{/if}
</div>

<style>
	.popover {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
	}

	.popover-trigger {
		display: inline-flex;
	}

	.popover-panel {
		position: absolute;
		z-index: var(--z-popover);
		min-width: 12rem;
		padding: 12px;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: var(--popover);
		color: var(--popover-foreground);
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		animation: popover-in 0.18s cubic-bezier(0.21, 1.02, 0.73, 1) both;
	}

	.popover-panel--bottom {
		top: calc(100% + 0.375rem);
	}

	.popover-panel--top {
		bottom: calc(100% + 0.375rem);
	}

	.popover-panel--left {
		right: calc(100% + 0.375rem);
	}

	.popover-panel--right {
		left: calc(100% + 0.375rem);
	}

	.popover-panel--start {
		left: 0;
	}

	.popover-panel--end {
		right: 0;
	}

	@keyframes popover-in {
		from {
			opacity: 0;
			transform: scale(0.98) translateY(-4px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}
</style>
