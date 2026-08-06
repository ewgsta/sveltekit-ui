<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		tabs = [],
		value = '',
		onValueChange,
		class: className = '',
		children
	}: {
		tabs: { value: string; label: string }[];
		value?: string;
		onValueChange?: (value: string) => void;
		class?: string;
		children?: Snippet;
	} = $props();
</script>

<div class={`tabs ${className}`} data-slot="tabs">
	<div class="tabs-list" role="tablist">
		{#each tabs as item (item.value)}
			<button
				class="tabs-trigger"
				class:tabs-trigger--active={value === item.value}
				role="tab"
				aria-selected={value === item.value}
				onclick={() => onValueChange?.(item.value)}
			>
				{item.label}
			</button>
		{/each}
	</div>
	{@render children?.()}
</div>

<style>
	.tabs {
		display: flex;
		flex-direction: column;
		gap: var(--space-2);
	}

	.tabs-list {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 4px;
		width: fit-content;
		height: 32px;
		padding: 3px;
		border-radius: var(--radius-lg);
		background: var(--muted);
		color: var(--muted-foreground);
	}

	.tabs-trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 6px;
		white-space: nowrap;
		height: calc(100% - 1px);
		flex: 1;
		padding: 2px 6px;
		border: 1px solid transparent;
		border-radius: var(--radius-md);
		background: transparent;
		color: color-mix(in srgb, var(--foreground) 60%, transparent);
		font-size: 0.875rem;
		font-weight: 500;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.tabs-trigger:hover {
		color: var(--foreground);
	}

	.tabs-trigger--active {
		background: var(--background);
		color: var(--foreground);
		box-shadow: var(--shadow-sm);
	}
</style>
