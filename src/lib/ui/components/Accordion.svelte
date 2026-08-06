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

	let openIndexes = new SvelteSet<number>();

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
		<div class="accordion-item">
			<h3 class="accordion-header">
				<button
					class="accordion-trigger"
					aria-expanded={openIndexes.has(index)}
					onclick={() => toggle(index)}
				>
					<span>{item.title}</span>
					<Chevron size={16} class={openIndexes.has(index) ? 'chevron-down' : ''} />
				</button>
			</h3>
			{#if openIndexes.has(index)}
				<div class="accordion-content">
					{@render item.content()}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style>
	.accordion {
		display: flex;
		flex-direction: column;
	}

	.accordion-item {
		border-bottom: 1px solid var(--border);
	}

	.accordion-header {
		margin: 0;
	}

	.accordion-trigger {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		padding: var(--space-4);
		border: 0;
		background: transparent;
		font-size: 0.9375rem;
		font-weight: 500;
		text-align: left;
		cursor: pointer;
		transition: background-color 0.15s ease;
	}

	.accordion-trigger:hover {
		background: var(--muted);
	}

	.accordion-trigger :global(svg) {
		transition: transform 0.15s ease;
		color: var(--muted-foreground);
	}

	.chevron-down {
		transform: rotate(180deg);
	}

	.accordion-content {
		padding: 0 var(--space-4) var(--space-4);
		color: var(--muted-foreground);
		animation: accordion-fade 0.15s ease both;
	}

	@keyframes accordion-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}
</style>
