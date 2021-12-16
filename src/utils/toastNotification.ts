import { toast } from '@zerodevx/svelte-toast';

export const toastSuccess = (message: string) =>
	toast.push(message, {
		theme: {
			'--toastBackground': '#22c55e',
			'--toastColor': 'white',
			'--toastBarBackground': '#064e3b'
		}
	});

export const toastWarning = (message: string) =>
	toast.push(message, {
		theme: {
			'--toastBackground': '#fbbf24',
			'--toastColor': 'white',
			'--toastBarBackground': '#f59e0b'
		}
	});

export const toastError = (message: string) =>
	toast.push(message, {
		theme: {
			'--toastBackground': '#9B1C2E',
			'--toastColor': 'white',
			'--toastBarBackground': '#EDF1F5'
		}
	});
