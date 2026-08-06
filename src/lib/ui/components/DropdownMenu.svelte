<script lang="ts">
	import { setContext } from 'svelte';
	import type { Snippet } from 'svelte';

	let {
		trigger,
		align = 'start',
		class: className = '',
		children
	}: {
		trigger: Snippet;
		align?: 'start' | 'end';
		class?: string;
		children?: Snippet;
	} = $props();

	let open = $state(false);
	let rootEl: HTMLDivElement;

	const ctx = {
		close: () => (open = false)
	};
	setContext('dropdown-menu', ctx);

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

<div class={`dropdown ${className}`} class:dropdown--open={open} bind:this={rootEl}>
	<div
		class="dropdown-trigger"
		role="button"
		tabindex="0"
		aria-haspopup="menu"
		aria-expanded={open}
		onclick={() => (open = !open)}
		onkeydown={onTriggerKey}
	>
		{@render trigger()}
	</div>
	{#if open}
		<div class={`dropdown-menu dropdown-menu--${align}`} role="menu" tabindex="-1">
			{@render children?.()}
		</div>
	{/if}
</div>

<style>
	.dropdown {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
	}

	.dropdown-trigger {
		display: inline-flex;
	}

	.dropdown-menu {
		position: absolute;
		top: calc(100% + 0.375rem);
		z-index: var(--z-dropdown);
		min-width: 10rem;
		padding: 4px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		background: var(--popover);
		color: var(--popover-foreground);
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		transform-origin: top;
		animation: dropdown-in 0.16s cubic-bezier(0.21, 1.02, 0.73, 1) both;
	}

	.dropdown-menu--start {
		left: 0;
	}

	.dropdown-menu--end {
		right: 0;
	}

	@keyframes dropdown-in {
		from {
			opacity: 0;
			transform: translateY(-4px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}
</style>
