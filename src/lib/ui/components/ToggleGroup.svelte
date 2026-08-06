<script lang="ts">
	type ToggleGroupItem = { value: string; label: string };

	let {
		items = [],
		type = 'single',
		value = $bindable(''),
		values = $bindable([]),
		disabled = false,
		class: className = ''
	}: {
		items?: ToggleGroupItem[];
		type?: 'single' | 'multiple';
		value?: string;
		values?: string[];
		disabled?: boolean;
		class?: string;
	} = $props();

	function isActive(v: string) {
		return type === 'single' ? value === v : values.includes(v);
	}

	function toggle(v: string) {
		if (type === 'single') {
			value = value === v ? '' : v;
		} else {
			values = values.includes(v) ? values.filter((x) => x !== v) : [...values, v];
		}
	}
</script>

<div class={`toggle-group ${className}`} data-slot="toggle-group" role="group">
	{#each items as item (item.value)}
		<button
			class="toggle-group-item"
			class:toggle-group-item--active={isActive(item.value)}
			type="button"
			aria-pressed={isActive(item.value)}
			{disabled}
			onclick={() => toggle(item.value)}
		>
			{item.label}
		</button>
	{/each}
</div>

<style>
	.toggle-group {
		display: inline-flex;
		align-items: center;
		flex-shrink: 0;
		border-radius: var(--radius-md);
		border: 1px solid var(--border);
		background: var(--background);
		box-shadow: var(--shadow-xs);
		overflow: hidden;
	}

	.toggle-group-item {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		height: 32px;
		padding: 0 14px;
		border: 0;
		background: transparent;
		color: var(--muted-foreground);
		font-size: 0.813rem;
		font-weight: 500;
		cursor: pointer;
		outline: none;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.toggle-group-item + .toggle-group-item {
		border-left: 1px solid var(--border);
	}

	.toggle-group-item:hover:not(:disabled) {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.toggle-group-item--active {
		background: var(--secondary);
		color: var(--secondary-foreground);
	}

	.toggle-group-item--active:hover:not(:disabled) {
		background: var(--secondary);
		color: var(--secondary-foreground);
	}

	.toggle-group-item:focus-visible {
		box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.toggle-group-item:disabled {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
