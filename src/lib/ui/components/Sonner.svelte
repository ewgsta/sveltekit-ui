<script lang="ts">
	import { X } from '$lib/ui/icons';
	import { dismiss, remove, toasts } from '$lib/ui/sonner.svelte';

	let toastEls = $state<Record<number, HTMLDivElement>>({});

	function onPointerDown(event: PointerEvent, id: number) {
		if ((event.target as HTMLElement).closest('[data-no-drag]')) return;
		const el = toastEls[id];
		if (!el || el.dataset.dragging === 'true') return;
		el.setPointerCapture(event.pointerId);
		const startX = event.clientX;
		let dx = 0;

		const move = (e: PointerEvent) => {
			dx = e.clientX - startX;
			el.dataset.dragging = 'true';
			el.style.transition = 'none';
			el.style.transform = `translateX(${dx}px)`;
			el.style.opacity = String(Math.max(0.15, 1 - Math.abs(dx) / 220));
		};

		const up = () => {
			el.removeEventListener('pointermove', move);
			el.removeEventListener('pointerup', up);
			delete el.dataset.dragging;
			if (Math.abs(dx) > 80) {
				const dir = dx > 0 ? 100 : -100;
				el.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
				el.style.transform = `translateX(${dir}%)`;
				el.style.opacity = '0';
				setTimeout(() => remove(id), 160);
			} else {
				el.style.transition = 'transform 0.2s ease, opacity 0.2s ease';
				el.style.transform = '';
				el.style.opacity = '';
			}
		};

		el.addEventListener('pointermove', move);
		el.addEventListener('pointerup', up);
	}
</script>

<div class="sonner-viewport" role="region" aria-live="polite" aria-label="Bildirimler">
	{#each toasts as item (item.id)}
		<div
			class="sonner-toast"
			class:sonner-toast--error={item.type === 'error'}
			class:sonner-toast--leaving={item.leaving}
			role="status"
			style="touch-action: pan-y"
			bind:this={toastEls[item.id]}
			onpointerdown={(e) => onPointerDown(e, item.id)}
		>
			<div class="sonner-toast-body">
				<p class="sonner-toast-title">{item.title}</p>
				{#if item.description}
					<p class="sonner-toast-description">{item.description}</p>
				{/if}
			</div>
			{#if item.action}
				<button
					class="sonner-action"
					data-no-drag
					type="button"
					onclick={() => {
						item.action?.onClick();
						dismiss(item.id);
					}}
				>
					{item.action.label}
				</button>
			{/if}
			<button
				class="sonner-close"
				data-no-drag
				type="button"
				aria-label="Kapat"
				title="Kapat"
				onclick={() => dismiss(item.id)}
			>
				<X size={14} />
			</button>
		</div>
	{/each}
</div>

<style>
	.sonner-viewport {
		position: fixed;
		bottom: 1rem;
		right: 1rem;
		z-index: var(--z-tooltip);
		display: flex;
		flex-direction: column-reverse;
		gap: 0.5rem;
		pointer-events: none;
	}

	.sonner-toast {
		display: flex;
		align-items: flex-start;
		gap: 0.75rem;
		width: min(22rem, 100vw - 2rem);
		padding: 0.75rem 0.875rem 0.75rem 1rem;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: var(--background);
		color: var(--foreground);
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		pointer-events: auto;
		will-change: transform, opacity;
		animation: sonner-in 0.35s cubic-bezier(0.21, 1.02, 0.73, 1) both;
	}

	.sonner-toast--error {
		background: var(--destructive);
		border-color: color-mix(in srgb, var(--destructive) 60%, transparent);
		color: var(--destructive-foreground);
	}

	.sonner-toast-body {
		display: flex;
		flex-direction: column;
		gap: 0.25rem;
		flex: 1;
		min-width: 0;
		padding-top: 0.125rem;
	}

	.sonner-toast-title {
		font-size: 0.875rem;
		font-weight: 600;
		line-height: 1.3;
	}

	.sonner-toast-description {
		font-size: 0.813rem;
		line-height: 1.4;
		color: var(--muted-foreground);
	}

	.sonner-toast--error .sonner-toast-description {
		color: color-mix(in srgb, var(--destructive-foreground) 65%, transparent);
	}

	.sonner-action {
		flex-shrink: 0;
		align-self: center;
		padding: 0.25rem 0.75rem;
		border: 0;
		border-radius: var(--radius-md);
		background: var(--primary);
		color: var(--primary-foreground);
		font-size: 0.75rem;
		font-weight: 500;
		cursor: pointer;
	}

	.sonner-close {
		flex-shrink: 0;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease,
			opacity 0.15s ease;
	}

	.sonner-close:hover {
		background: color-mix(in srgb, var(--foreground) 10%, transparent);
		color: var(--foreground);
	}

	.sonner-close:focus-visible {
		outline: none;
		box-shadow: 0 0 0 2px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.sonner-toast--leaving {
		animation: sonner-out 0.3s cubic-bezier(0.21, 1.02, 0.73, 1) forwards;
	}

	@keyframes sonner-in {
		from {
			opacity: 0;
			transform: translateY(0.75rem) scale(0.96);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes sonner-out {
		from {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
		to {
			opacity: 0;
			transform: translateY(0.5rem) scale(0.96);
		}
	}
</style>
