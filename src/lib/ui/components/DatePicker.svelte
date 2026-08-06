<script lang="ts">
	import { Calendar, ChevronLeft, ChevronRight, X } from '$lib/ui/icons';

	let {
		value = $bindable<Date | undefined>(undefined),
		placeholder = 'Tarih seç',
		clearable = true,
		disabled = false,
		class: className = ''
	}: {
		value?: Date;
		placeholder?: string;
		clearable?: boolean;
		disabled?: boolean;
		class?: string;
	} = $props();

	let open = $state(false);
	let visible = $state(false);
	let closing = $state(false);
	let rootEl: HTMLDivElement;
	let view = $state(new Date());

	const weekdays = ['Pt', 'Sa', 'Ça', 'Pe', 'Cu', 'Ct', 'Pz'];

	const label = $derived(
		value
			? value.toLocaleDateString('tr-TR', { day: '2-digit', month: '2-digit', year: 'numeric' })
			: placeholder
	);
	const monthLabel = $derived(view.toLocaleDateString('tr-TR', { month: 'long', year: 'numeric' }));
	const days = $derived.by(() => {
		const first = new Date(view.getFullYear(), view.getMonth(), 1);
		const offset = (first.getDay() + 6) % 7;
		const start = new Date(view.getFullYear(), view.getMonth(), 1 - offset);
		return Array.from({ length: 42 }, (_, i) => {
			const d = new Date(start.getFullYear(), start.getMonth(), start.getDate() + i);
			return d;
		});
	});

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
			}, 160);
			return () => {
				clearTimeout(t);
			};
		}
	});

	$effect(() => {
		if (!open) return;
		const onClick = (e: MouseEvent) => {
			if (rootEl && !rootEl.contains(e.target as Node)) open = false;
		};
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') open = false;
		};
		document.addEventListener('pointerdown', onClick);
		document.addEventListener('keydown', onKey);
		return () => {
			document.removeEventListener('pointerdown', onClick);
			document.removeEventListener('keydown', onKey);
		};
	});

	function sameDay(a: Date | undefined, b: Date) {
		return (
			a &&
			a.getFullYear() === b.getFullYear() &&
			a.getMonth() === b.getMonth() &&
			a.getDate() === b.getDate()
		);
	}

	function inView(d: Date) {
		return d.getMonth() === view.getMonth();
	}

	function isToday(d: Date) {
		const now = new Date();
		return (
			d.getFullYear() === now.getFullYear() &&
			d.getMonth() === now.getMonth() &&
			d.getDate() === now.getDate()
		);
	}

	function pick(d: Date) {
		value = d;
		open = false;
	}

	function clear(e: MouseEvent | KeyboardEvent) {
		e.stopPropagation();
		value = undefined;
	}

	function toggle() {
		view = value ?? new Date();
		open = !open;
	}
</script>

<div class={`datepicker ${className}`} bind:this={rootEl}>
	<button
		class="datepicker-trigger"
		class:datepicker-trigger--empty={!value}
		class:datepicker-trigger--open={open}
		type="button"
		aria-haspopup="dialog"
		aria-expanded={open}
		{disabled}
		onclick={toggle}
	>
		<Calendar size={16} />
		<span class="datepicker-value">{label}</span>
		{#if clearable && value}
			<span
				class="datepicker-clear"
				role="button"
				tabindex="0"
				onclick={clear}
				onkeydown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						clear(e);
					}
				}}
			>
				<X size={14} />
			</span>
		{/if}
	</button>

	{#if visible}
		<div
			class="datepicker-panel"
			class:datepicker-panel--closing={closing}
			role="dialog"
			aria-label="Tarih seçici"
		>
			<div class="datepicker-nav">
				<button
					class="datepicker-nav-btn"
					type="button"
					aria-label="Önceki ay"
					onclick={() => (view = new Date(view.getFullYear(), view.getMonth() - 1, 1))}
				>
					<ChevronLeft size={16} />
				</button>
				<span class="datepicker-month">{monthLabel}</span>
				<button
					class="datepicker-nav-btn"
					type="button"
					aria-label="Sonraki ay"
					onclick={() => (view = new Date(view.getFullYear(), view.getMonth() + 1, 1))}
				>
					<ChevronRight size={16} />
				</button>
			</div>
			<div class="datepicker-grid">
				{#each weekdays as day (day)}
					<span class="datepicker-weekday">{day}</span>
				{/each}
				{#each days as day, i (i)}
					<button
						class="datepicker-day"
						class:datepicker-day--muted={!inView(day)}
						class:datepicker-day--today={isToday(day)}
						class:datepicker-day--selected={sameDay(value, day)}
						type="button"
						onclick={() => pick(day)}
					>
						{day.getDate()}
					</button>
				{/each}
			</div>
		</div>
	{/if}
</div>

<style>
	.datepicker {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
	}

	.datepicker-trigger {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		width: 100%;
		min-width: 8rem;
		height: 36px;
		padding: 0 12px;
		border-radius: var(--radius-md);
		border: 1px solid var(--input);
		background: var(--background);
		color: var(--foreground);
		font-size: 0.875rem;
		box-shadow: var(--shadow-xs);
		cursor: pointer;
		outline: none;
		transition:
			border-color 0.15s ease,
			box-shadow 0.15s ease;
	}

	.datepicker-value {
		flex: 1;
		text-align: left;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.datepicker-trigger--empty .datepicker-value {
		color: var(--muted-foreground);
	}

	.datepicker-trigger:focus-visible,
	.datepicker-trigger--open {
		border-color: var(--ring);
		box-shadow: 0 0 0 3px color-mix(in srgb, var(--ring) 50%, transparent);
	}

	.datepicker-trigger:disabled {
		cursor: not-allowed;
		opacity: 0.5;
	}

	.datepicker-trigger > :global(svg) {
		flex-shrink: 0;
		color: var(--muted-foreground);
	}

	.datepicker-clear {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 18px;
		height: 18px;
		border-radius: var(--radius-sm);
		color: var(--muted-foreground);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.datepicker-clear:hover {
		background: color-mix(in srgb, var(--foreground) 8%, transparent);
		color: var(--foreground);
	}

	.datepicker-panel {
		position: absolute;
		top: calc(100% + 4px);
		left: 0;
		z-index: var(--z-dropdown);
		padding: 12px;
		border-radius: var(--radius-lg);
		border: 1px solid var(--border);
		background: var(--popover);
		color: var(--popover-foreground);
		box-shadow:
			0 10px 15px -3px rgb(0 0 0 / 0.1),
			0 4px 6px -4px rgb(0 0 0 / 0.1);
		transform-origin: top;
		animation: datepicker-in 0.16s cubic-bezier(0.21, 1.02, 0.73, 1) both;
	}

	.datepicker-nav {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 8px;
		margin-bottom: 8px;
	}

	.datepicker-month {
		font-size: 0.875rem;
		font-weight: 500;
		text-transform: capitalize;
	}

	.datepicker-nav-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 26px;
		height: 26px;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--muted-foreground);
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.datepicker-nav-btn:hover {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.datepicker-grid {
		display: grid;
		grid-template-columns: repeat(7, 1fr);
		gap: 2px;
	}

	.datepicker-weekday {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		height: 28px;
		font-size: 0.75rem;
		color: var(--muted-foreground);
	}

	.datepicker-day {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 32px;
		height: 32px;
		border: 0;
		border-radius: var(--radius-sm);
		background: transparent;
		color: var(--popover-foreground);
		font-size: 0.813rem;
		cursor: pointer;
		transition:
			background-color 0.15s ease,
			color 0.15s ease;
	}

	.datepicker-day:hover {
		background: var(--accent);
		color: var(--accent-foreground);
	}

	.datepicker-day--muted {
		color: var(--muted-foreground);
		opacity: 0.5;
	}

	.datepicker-day--today {
		font-weight: 600;
		box-shadow: inset 0 0 0 1px var(--ring);
	}

	.datepicker-day--selected {
		background: var(--primary);
		color: var(--primary-foreground);
		font-weight: 500;
	}

	.datepicker-day--selected:hover {
		background: var(--primary);
		color: var(--primary-foreground);
		opacity: 0.9;
	}

	.datepicker-panel--closing {
		animation: datepicker-out 0.16s cubic-bezier(0.55, 0.06, 0.68, 0.19) forwards;
	}

	@keyframes datepicker-in {
		from {
			opacity: 0;
			transform: translateY(-4px) scale(0.98);
		}
		to {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
	}

	@keyframes datepicker-out {
		from {
			opacity: 1;
			transform: translateY(0) scale(1);
		}
		to {
			opacity: 0;
			transform: translateY(-3px) scale(0.98);
		}
	}
</style>
