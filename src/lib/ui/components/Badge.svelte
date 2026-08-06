<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	type Variant = 'default' | 'secondary' | 'destructive' | 'outline';

	let {
		variant = 'default',
		class: className = '',
		children,
		...rest
	}: HTMLAttributes<HTMLSpanElement> & {
		variant?: Variant;
		children?: Snippet;
	} = $props();
</script>

<span class={`badge badge--${variant} ${className}`} data-slot="badge" {...rest}>
	{@render children?.()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: var(--space-1);
		width: fit-content;
		border-radius: 9999px;
		border: 1px solid transparent;
		padding: 0 var(--space-2);
		font-size: 0.75rem;
		font-weight: 600;
		line-height: 1.375rem;
		white-space: nowrap;
	}

	.badge--default {
		background: var(--primary);
		color: var(--primary-foreground);
	}

	.badge--secondary {
		background: var(--secondary);
		color: var(--secondary-foreground);
	}

	.badge--destructive {
		background: var(--destructive);
		color: var(--destructive-foreground);
	}

	.badge--outline {
		border-color: var(--border);
		color: var(--foreground);
	}
</style>
