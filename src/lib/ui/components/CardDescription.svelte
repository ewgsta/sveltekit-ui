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

<p class={`card-description ${className}`} data-slot="description" {...rest}>
	{@render children?.()}
</p>

<style>
	.card-description {
		font-size: 0.875rem;
		color: var(--muted-foreground);
	}
</style>
