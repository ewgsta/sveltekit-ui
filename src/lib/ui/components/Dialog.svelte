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

	let visible = $state(false);
	let closing = $state(false);

	$effect(() => {
		if (open && !visible) {
			visible = true;
			closing = false;
			return;
		}
		if (!open && visible) {
			closing = true;
			const t = setTimeout(() => {
				visible = false;
				closing = false;
			}, 220);
			return () => clearTimeout(t);
		}
	});

	function close() {
		onclose?.();
	}

	function onClickBackdrop(event: MouseEvent) {
		if (event.target === event.currentTarget) close();
	}
</script>

{#if visible}
	<div class="dialog-root" class:dialog-root--closing={closing}>
		<div class="dialog-overlay" role="presentation" onclick={onClickBackdrop}>
			<div
				class={`dialog ${className}`}
				class:dialog--closing={closing}
				data-slot="dialog-content"
				role="dialog"
				aria-modal="true"
				aria-label={title || undefined}
			>
				<div class="dialog-header">
					{#if title}<h2 class="dialog-title">{title}</h2>{/if}
					{#if description}
						<p class="dialog-description">{description}</p>
					{/if}
				</div>
				<div class="dialog-body">{@render children?.()}</div>
				{#if closeButton}
					<button
						class="dialog-close"
						data-slot="dialog-close"
						onclick={close}
						aria-label="Kapat"
						title="Kapat"
					>
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
		animation: dialog-fade-in 0.2s ease both;
	}

	.dialog-root--closing .dialog-overlay {
		animation: dialog-fade-out 0.2s ease forwards;
	}

	.dialog {
		position: relative;
		display: flex;
		flex-direction: column;
		gap: 20px;
		width: 100%;
		max-width: 32rem;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: var(--background);
		padding: 24px;
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		animation: dialog-pop-in 0.22s cubic-bezier(0.16, 1, 0.3, 1) both;
	}

	.dialog--closing {
		animation: dialog-pop-out 0.16s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
	}

	.dialog-header {
		display: flex;
		flex-direction: column;
		gap: 8px;
		padding-right: 24px;
	}

	.dialog-title {
		margin: 0;
		font-size: 1.125rem;
		font-weight: 600;
		line-height: 1.2;
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
		top: 20px;
		right: 20px;
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
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.dialog-close:hover {
		background: color-mix(in srgb, var(--foreground) 8%, transparent);
		color: var(--foreground);
	}

	.dialog-close:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	@keyframes dialog-fade-in {
		from {
			opacity: 0;
		}
		to {
			opacity: 1;
		}
	}

	@keyframes dialog-fade-out {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@keyframes dialog-pop-in {
		from {
			opacity: 0;
			transform: scale(0.96) translateY(6px);
		}
		to {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
	}

	@keyframes dialog-pop-out {
		from {
			opacity: 1;
			transform: scale(1) translateY(0);
		}
		to {
			opacity: 0;
			transform: scale(0.97) translateY(4px);
		}
	}
</style>
