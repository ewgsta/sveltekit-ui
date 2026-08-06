<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	let {
		class: className = '',
		children,
		...rest
	}: HTMLAttributes<HTMLDivElement> & {
		children?: Snippet;
	} = $props();
</script>

<div class={`avatar-fallback ${className}`} data-slot="avatar-fallback" {...rest}>
	{@render children?.()}
</div>

<style>
	.avatar-fallback {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
		border-radius: 9999px;
		background: var(--muted);
		color: var(--muted-foreground);
	}
</style>
