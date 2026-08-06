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
		<div class="dialog-backdrop" role="presentation" onclick={onClickBackdrop}>
			<div
				class={`dialog ${className}`}
				role="dialog"
				aria-modal="true"
				aria-label={title || undefined}
			>
				<header class="dialog-header">
					<div>
						{#if title}
							<h2 class="dialog-title">{title}</h2>
						{/if}
						{#if description}
							<p class="dialog-description">{description}</p>
						{/if}
					</div>
					{#if closeButton}
						<button class="dialog-close" onclick={close} aria-label="Kapat" data-slot="button">
							<X size={16} />
						</button>
					{/if}
				</header>
				<div class="dialog-body">{@render children?.()}</div>
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

	.dialog-backdrop {
		position: absolute;
		inset: 0;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--space-6);
		background: rgb(0 0 0 / 0.5);
		animation: dialog-fade 0.15s ease both;
	}

	.dialog {
		width: 100%;
		max-width: 28rem;
		max-height: calc(100vh - 4rem);
		overflow-y: auto;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: var(--background);
		color: var(--foreground);
		box-shadow: var(--shadow-sm);
		animation: dialog-pop 0.15s ease both;
	}

	.dialog-header {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: var(--space-4);
		padding: var(--space-6);
		padding-bottom: var(--space-4);
	}

	.dialog-title {
		font-size: 1.125rem;
		font-weight: 600;
		line-height: 1.3;
	}

	.dialog-description {
		margin-top: var(--space-1);
		font-size: 0.875rem;
		color: var(--muted-foreground);
	}

	.dialog-close {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 2rem;
		height: 2rem;
		flex-shrink: 0;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.dialog-close:hover {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.dialog-body {
		padding: var(--space-4) var(--space-6) var(--space-6);
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
