<script lang="ts">
	let { class: className = '' }: { class?: string } = $props();
</script>

<div class={`dropdown-separator ${className}`} role="separator"></div>

<style>
	.dropdown-separator {
		height: 1px;
		margin: 4px 0;
		background: var(--border);
	}
</style>
