<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className = '',
		children,
		...rest
	}: HTMLAttributes<HTMLHeadingElement> & {
		children?: Snippet;
	} = $props();
</script>

<h3 class={`card-title ${className}`} data-slot="card-title" {...rest}>
	{@render children?.()}
</h3>

<style>
	.card-title {
		font-weight: 600;
		font-size: 1.25rem;
		line-height: 1;
		letter-spacing: -0.01em;
	}
</style>
