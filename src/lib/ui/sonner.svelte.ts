export type Toast = {
	id: number;
	title: string;
	description?: string;
	type?: 'default' | 'success' | 'error';
	action?: { label: string; onClick: () => void };
	duration?: number;
	leaving?: boolean;
};

export type ToastInput = Omit<Toast, 'id' | 'leaving'>;

const toasts = $state<Toast[]>([]);
let counter = 0;

export function dismiss(id: number) {
	const toast = toasts.find((t) => t.id === id);
	if (!toast) return;
	markLeaving(toast.id);
	setTimeout(() => {
		const index = toasts.findIndex((t) => t.id === id);
		if (index !== -1) toasts.splice(index, 1);
	}, 300);
}

export function remove(id: number) {
	const index = toasts.findIndex((t) => t.id === id);
	if (index !== -1) toasts.splice(index, 1);
}

function markLeaving(id: number) {
	const index = toasts.findIndex((t) => t.id === id);
	if (index !== -1) {
		toasts[index] = { ...toasts[index], leaving: true };
	}
}

function spawn(input: ToastInput) {
	counter += 1;
	const toast: Toast = { ...input, id: counter };
	toasts.push(toast);
	setTimeout(() => dismiss(toast.id), input.duration ?? 4000);
	return toast.id;
}

export const toast = {
	default: (input: ToastInput) => spawn({ type: 'default', ...input }),
	success: (input: ToastInput) => spawn({ type: 'success', ...input }),
	error: (input: ToastInput) => spawn({ type: 'error', ...input })
};

export { toasts };
