<script lang="ts">
	import { Check, Chevron, Search } from '$lib/ui/icons';

	type ComboboxItem = { value: string; label: string };

	let {
		value = $bindable(''),
		items = [],
		placeholder = 'Ara…',
		trigPlaceholder = 'Seç…',
		disabled = false,
		emptyText = 'Sonuç bulunamadı',
		class: className = ''
	}: {
		value?: string;
		items?: ComboboxItem[];
		placeholder?: string;
		trigPlaceholder?: string;
		disabled?: boolean;
		emptyText?: string;
		class?: string;
	} = $props();

	let open = $state(false);
	let visible = $state(false);
	let closing = $state(false);
	let query = $state('');
	let rootEl: HTMLDivElement;
	let inputEl = $state<HTMLInputElement | undefined>();

	const selected = $derived(items.find((i) => i.value === value));
	const filtered = $derived(
		query
			? items.filter((i) => i.label.toLocaleLowerCase().includes(query.toLocaleLowerCase()))
			: items
	);

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
				query = '';
			}, 160);
			return () => {
				clearTimeout(t);
			};
		}
	});

	$effect(() => {
		if (!open) return;
		inputEl?.focus();
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

	function select(item: ComboboxItem) {
		value = item.value;
		open = false;
	}
</script>

<div class={`combobox ${className}`} bind:this={rootEl}>
	<button
		class="combobox-trigger"
		class:combobox-trigger--empty={!selected}
		class:combobox-trigger--open={open}
		type="button"
		aria-haspopup="listbox"
		aria-expanded={open}
		{disabled}
		onclick={() => (open = !open)}
	>
		<span class="combobox-value">{selected?.label ?? trigPlaceholder}</span>
		<Chevron
			size={16}
			class={open ? 'combobox-chevron combobox-chevron--open' : 'combobox-chevron'}
		/>
	</button>

	{#if visible}
		<div class="combobox-panel" class:combobox-panel--closing={closing}>
			<div class="combobox-search">
				<Search size={14} />
				<input
					bind:this={inputEl}
					class="combobox-input"
					type="text"
					{placeholder}
					bind:value={query}
				/>
			</div>
			<div class="combobox-list" role="listbox">
				{#if filtered.length}
					{#each filtered as item (item.value)}
						<button
							class="combobox-item"
							class:combobox-item--selected={item.value === value}
							type="button"
							role="option"
							aria-selected={item.value === value}
							onclick={() => select(item)}
						>
							<span class="combobox-item-check">
								{#if item.value === value}
									<Check size={16} />
								{/if}
							</span>
							<span class="combobox-item-label">{item.label}</span>
						</button>
					{/each}
				{:else}
					<p class="combobox-empty">{emptyText}</p>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style>
	.combobox {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
	}

	.combobox-trigger {
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

	.combobox-value {
		flex: 1;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.combobox-trigger--empty .combobox-value {
		color: var(--muted-foreground);
	}

	.combobox-trigger:focus-visible,
	.combobox-trigger--open {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.combobox-trigger:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.combobox-chevron {
		flex-shrink: 0;
		color: var(--muted-foreground);
		transition: transform 0.2s ease;
	}

	.combobox-chevron--open {
		transform: rotate(180deg);
	}

	.combobox-panel {
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
		animation: combobox-in 0.16s cubic-bezier(0.21, 1.02, 0.73, 1) both;
	}

	.combobox-search {
		display: flex;
		align-items: center;
		gap: 8px;
		padding: 0 8px;
		margin-bottom: 4px;
		border-radius: var(--radius-sm);
		border: 1px solid var(--input);
		color: var(--muted-foreground);
	}

	.combobox-input {
		flex: 1;
		min-width: 0;
		height: 30px;
		border: 0;
		background: transparent;
		font-size: 0.875rem;
		outline: none;
	}

	.combobox-list {
		max-height: 15rem;
		overflow-y: auto;
	}

	.combobox-item {
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

	.combobox-item:hover {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.combobox-item-check {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 16px;
		flex-shrink: 0;
		color: var(--primary);
	}

	.combobox-item:not(.combobox-item--selected) .combobox-item-check {
		opacity: 0;
	}

	.combobox-empty {
		padding: 6px 8px;
		font-size: 0.813rem;
		color: var(--muted-foreground);
	}

	.combobox-panel--closing {
		animation: combobox-out 0.16s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
	}

	@keyframes combobox-in {
		from {
			opacity: 0;
			transform: translateY(-4px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes combobox-out {
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
