<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'default' | 'destructive';

	let {
		variant = 'default',
		title = '',
		class: className = '',
		children,
		...rest
	}: HTMLAttributes<HTMLDivElement> & {
		variant?: Variant;
		title?: string;
		children?: Snippet;
	} = $props();
</script>

<div class={`alert alert--${variant} ${className}`} role="alert" {...rest}>
	{#if title}<h5 class="alert-title">{title}</h5>{/if}
	<div class="alert-content">{@render children?.()}</div>
</div>

<style>
	.alert {
		position: relative;
		width: 100%;
		border-radius: var(--radius-lg);
		border: 1px solid transparent;
		padding: var(--space-4);
		font-size: 0.875rem;
	}

	.alert--default {
		border-color: var(--border);
		background: var(--card);
		color: var(--card-foreground);
	}

	.alert--destructive {
		border-color: color-mix(in srgb, var(--destructive) 50%, transparent);
		background: color-mix(in srgb, var(--destructive) 10%, transparent);
		color: var(--destructive);
	}

	.alert-title {
		margin-bottom: var(--space-1);
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.25;
	}

	.alert-content {
		color: var(--foreground);
		line-height: 1.5;
	}

	.alert--destructive .alert-content {
		color: var(--destructive);
	}
</style>
