<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className = '',
		children,
		...rest
	}: HTMLAttributes<HTMLParagraphElement> & {
		children?: Snippet;
	} = $props();
</script>

<p class={`card-description ${className}`} data-slot="card-description" {...rest}>
	{@render children?.()}
</p>

<style>
	.card-description {
		color: var(--muted-foreground);
		font-size: 0.875rem;
	}
</style>
