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
		gap: var(--space-1);
		width: fit-content;
		height: 2rem;
		padding: 0.188rem;
		border-radius: var(--radius-lg);
		background: var(--muted);
		color: var(--muted-foreground);
	}

	.tabs-trigger {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		white-space: nowrap;
		height: 1.5rem;
		padding: 0 var(--space-3);
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: inherit;
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
		box-shadow: var(--shadow-xs);
	}
</style>
