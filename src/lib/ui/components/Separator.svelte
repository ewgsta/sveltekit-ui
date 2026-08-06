<script lang="ts">
	let {
		orientation = 'horizontal',
		class: className = ''
	}: { orientation?: 'horizontal' | 'vertical'; class?: string } = $props();
</script>

<div
	class={`separator separator--${orientation} ${className}`}
	role="separator"
	data-slot="separator"
></div>

<style>
	.separator {
		flex-shrink: 0;
		background: var(--border);
	}

	.separator--horizontal {
		width: 100%;
		height: 1px;
	}

	.separator--vertical {
		width: 1px;
		height: 100%;
	}
</style>
