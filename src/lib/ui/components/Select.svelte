<script lang="ts">
	import { Check, Chevron } from '$lib/ui/icons';

	type SelectItem = { value: string; label: string };

	let {
		value = $bindable(''),
		items = [],
		placeholder = 'Seç…',
		disabled = false,
		class: className = ''
	}: {
		value?: string;
		items?: SelectItem[];
		placeholder?: string;
		disabled?: boolean;
		class?: string;
	} = $props();

	let open = $state(false);
	let visible = $state(false);
	let closing = $state(false);
	let rootEl: HTMLDivElement;

	const selected = $derived(items.find((i) => i.value === value));

	$effect(() => {
		if (open && !visible) {
			visible = true;
			closing = false;
			return;
		}
		if (!open && visible) {
			closing = true;
			const t = setTimeout(() => {
				visible = false;
				closing = false;
			}, 160);
			return () => {
				clearTimeout(t);
			};
		}
	});

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

	function select(item: SelectItem) {
		value = item.value;
		open = false;
	}
</script>

<div class={`select ${className}`} bind:this={rootEl}>
	<button
		class="select-trigger"
		class:select-trigger--empty={!selected}
		class:select-trigger--open={open}
		type="button"
		aria-haspopup="listbox"
		aria-expanded={open}
		{disabled}
		onclick={() => (open = !open)}
	>
		<span class="select-value">{selected?.label ?? placeholder}</span>
		<Chevron size={16} class={open ? 'select-chevron select-chevron--open' : 'select-chevron'} />
	</button>

	{#if visible}
		<div class="select-menu" class:select-menu--closing={closing} role="listbox">
			{#each items as item (item.value)}
				<button
					class="select-item"
					class:select-item--selected={item.value === value}
					type="button"
					role="option"
					aria-selected={item.value === value}
					onclick={() => select(item)}
				>
					<span class="select-item-check">
						{#if item.value === value}
							<Check size={16} />
						{/if}
					</span>
					<span class="select-item-label">{item.label}</span>
				</button>
			{/each}
		</div>
	{/if}
</div>

<style>
	.select {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
	}

	.select-trigger {
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		width: 100%;
		min-width: 8rem;
		height: 36px;
		padding: 0 12px;
		border-radius: var(--radius-md);
		border: 1px solid var(--input);
		background: var(--background);
		color: var(--foreground);
		font-size: 0.875rem;
		box-shadow: var(--shadow-xs);
		cursor: pointer;
		outline: none;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.select-value {
		flex: 1;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.select-trigger--empty .select-value {
		color: var(--muted-foreground);
	}

	.select-trigger:focus-visible,
	.select-trigger--open {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.select-trigger:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.select-chevron {
		flex-shrink: 0;
		color: var(--muted-foreground);
		transition: transform 0.2s ease;
	}

	.select-chevron--open {
		transform: rotate(180deg);
	}

	.select-menu {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		z-index: var(--z-dropdown);
		min-width: 100%;
		padding: 4px;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		background: var(--popover);
		color: var(--popover-foreground);
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		transform-origin: top;
		animation: select-in 0.18s cubic-bezier(0.21, 1.02, 0.73, 1) both;
	}

	.select-item {
		display: flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		padding: 6px 8px;
		padding-right: 24px;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--popover-foreground);
		font-size: 0.875rem;
		text-align: left;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.select-item:hover {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.select-item-check {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		flex-shrink: 0;
		color: var(--primary);
	}

	.select-item:not(.select-item--selected) .select-item-check {
		opacity: 0;
	}

	.select-menu--closing {
		animation: select-out 0.16s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
	}

	@keyframes select-in {
		from {
			opacity: 0;
			transform: translateY(-4px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes select-out {
		from {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
		to {
			opacity: 0;
			transform: translateY(-3px) scale(0.98);
		}
	}
</style>
