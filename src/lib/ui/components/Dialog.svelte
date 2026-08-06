<script lang="ts">
	import { X } from '$lib/ui/icons';
	import type { Snippet } from 'svelte';

	let {
		open = false,
		title = '',
		description = '',
		closeButton = true,
		class: className = '',
		onclose,
		children
	}: {
		open?: boolean;
		title?: string;
		description?: string;
		closeButton?: boolean;
		class?: string;
		onclose?: () => void;
		children?: Snippet;
	} = $props();

	function close() {
		onclose?.();
	}

	function onClickBackdrop(event: MouseEvent) {
		if (event.target === event.currentTarget) close();
	}
</script>

{#if open}
	<div class="dialog-root">
		<div class="dialog-overlay" role="presentation" onclick={onClickBackdrop}>
			<div
				class={`dialog ${className}`}
				data-slot="dialog-content"
				role="dialog"
				aria-modal="true"
				aria-label={title || undefined}
			>
				{#if title}<h2 class="dialog-title">{title}</h2>{/if}
				{#if description}
					<p class="dialog-description">{description}</p>
				{/if}
				<div class="dialog-body">{@render children?.()}</div>
				{#if closeButton}
					<button class="dialog-close" data-slot="dialog-close" onclick={close} aria-label="Kapat">
						<X size={16} />
					</button>
				{/if}
			</div>
		</div>
	</div>
{/if}

<style>
	.dialog-root {
		position: fixed;
		inset: 0;
		z-index: var(--z-modal);
	}

	.dialog-overlay {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		padding: var(--space-6);
		background: rgb(0 0 0 / 0.5);
		animation: dialog-fade 0.15s ease both;
	}

	.dialog {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 16px;
		width: 100%;
		max-width: 32rem;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: var(--background);
		padding: 24px;
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		animation: dialog-pop 0.15s ease both;
	}

	.dialog-title {
		font-size: 1.125rem;
		font-weight: 600;
		line-height: 1;
	}

	.dialog-description {
		margin: 0;
		color: var(--muted-foreground);
		font-size: 0.875rem;
	}

	.dialog-body {
		display: flex;
		flex-direction: column;
		gap: 16px;
	}

	.dialog-close {
		position: absolute;
		top: 16px;
		right: 16px;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 24px;
		height: 24px;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		opacity: 0.7;
		transition: opacity 0.15s ease;
	}

	.dialog-close:hover {
		opacity: 1;
	}

	@keyframes dialog-fade {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes dialog-pop {
		from {
			opacity: 0;
			transform: scale(0.95);
		}
		to {
			opacity: 1;
			transform: scale(1);
		}
	}
</style>
