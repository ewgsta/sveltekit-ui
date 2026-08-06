<script lang="ts">
	import { Chevron } from '$lib/ui/icons';
	import { SvelteSet } from 'svelte/reactivity';
	import type { Snippet } from 'svelte';

	let {
		items,
		class: className = ''
	}: {
		items: { title: string; content: Snippet }[];
		class?: string;
	} = $props();

	const openIndexes = new SvelteSet<number>();

	function toggle(index: number) {
		if (openIndexes.has(index)) {
			openIndexes.delete(index);
		} else {
			openIndexes.add(index);
		}
	}
</script>

<div class={`accordion ${className}`} data-slot="accordion">
	{#each items as item, index (index)}
		<div class="accordion-item" class:accordion-item--open={openIndexes.has(index)}>
			<h3 class="accordion-header">
				<button
					class="accordion-trigger"
					aria-expanded={openIndexes.has(index)}
					onclick={() => toggle(index)}
				>
					<span>{item.title}</span>
					<span class="accordion-chevron" class:accordion-chevron--open={openIndexes.has(index)}>
						<Chevron size={16} />
					</span>
				</button>
			</h3>
			<div class="accordion-panel" class:accordion-panel--open={openIndexes.has(index)}>
				<div class="accordion-content">
					{@render item.content()}
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.accordion {
		display: flex;
		flex-direction: column;
		border: 1px solid var(--border);
		border-radius: var(--radius-lg);
		background: var(--card);
		overflow: hidden;
	}

	.accordion-item {
		border-bottom: 1px solid var(--border);
	}

	.accordion-item:last-child {
		border-bottom: 0;
	}

	.accordion-header {
		margin: 0;
	}

	.accordion-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: var(--space-4);
		width: 100%;
		padding: var(--space-4);
		border: 0;
		background: transparent;
		color: var(--foreground);
		font-size: 0.9375rem;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.accordion-trigger:hover {
		background: var(--muted);
	}

	.accordion-trigger:focus-visible {
		outline: none;
		box-shadow: inset 0 0 0 2px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.accordion-chevron {
		display: inline-flex;
		flex-shrink: 0;
		color: var(--muted-foreground);
		transition: transform 0.2s ease;
	}

	.accordion-chevron--open {
		transform: rotate(180deg);
	}

	.accordion-panel {
		display: grid;
		grid-template-rows: 0fr;
		transition: grid-template-rows 0.25s ease;
	}

	.accordion-panel--open {
		grid-template-rows: 1fr;
	}

	.accordion-content {
		overflow: hidden;
		min-height: 0;
		padding: 0 var(--space-4);
		color: var(--muted-foreground);
		font-size: 0.875rem;
		line-height: 1.6;
		opacity: 0;
		transition: opacity 0.2s ease 0.1s;
	}

	.accordion-panel--open .accordion-content {
		opacity: 1;
		padding-bottom: var(--space-4);
	}
</style>
