<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLLabelAttributes } from 'svelte/elements';

	let {
		class: className = '',
		children,
		...rest
	}: HTMLLabelAttributes & { children?: Snippet } = $props();
</script>

<label class={`label ${className}`} {...rest}>
	{@render children?.()}
</label>

<style>
	.label {
		display: flex;
		align-items: center;
		gap: var(--space-2);
		font-size: 0.875rem;
		font-weight: 500;
		line-height: 1;
		user-select: none;
	}

	.label:disabled,
	.label[data-disabled='true'] {
		pointer-events: none;
		opacity: 0.5;
	}
</style>
