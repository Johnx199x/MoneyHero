export interface ValidationResult {
	isValid: boolean;
	error?: string;
}

/**
 * Sanitiza strings para prevenir XSS básico
 */
export function sanitizeString(str: string): string {
	return str
		.trim()
		.replace(/[<>]/g, '') // Elimina < y >
		.slice(0, 200); // Límite de caracteres
}

/**
 * Valida el nombre de la transacción
 */
export function validateTransactionName(name: string): ValidationResult {
	const sanitized = sanitizeString(name);

	if (!sanitized || sanitized.length === 0) {
		return { isValid: false, error: 'Transaction name is required' };
	}

	if (sanitized.length < 2) {
		return { isValid: false, error: 'Name must be at least 2 characters' };
	}

	if (sanitized.length > 30) {
		return { isValid: false, error: 'Name is too long (max 30 characters)' };
	}

	return { isValid: true };
}

/**
 * Valida la descripción
 */
export function validateDescription(description: string): ValidationResult {
	const sanitized = sanitizeString(description);

	if (sanitized.length > 500) {
		return {
			isValid: false,
			error: 'Description is too long (max 500 characters)',
		};
	}

	return { isValid: true };
}

/**
 * Valida el monto
 */
export function validateAmount(amount: number | string): ValidationResult {
	const num = typeof amount === 'string' ? parseFloat(amount) : amount;

	if (isNaN(num)) {
		return { isValid: false, error: 'Amount must be a valid number' };
	}

	if (num <= 0) {
		return { isValid: false, error: 'Amount must be greater than 0' };
	}

	if (num > 1000000000) {
		// 1 billón
		return {
			isValid: false,
			error: 'Amount is too large (max $1,000,000,000)',
		};
	}

	// Validar máximo 2 decimales
	if (!/^\d+(\.\d{1,2})?$/.test(num.toString())) {
		return {
			isValid: false,
			error: 'Amount can have maximum 2 decimal places',
		};
	}

	return { isValid: true };
}

/**
 * Valida la fecha
 */
export function validateDate(dateString: string): ValidationResult {
	if (!dateString) {
		return { isValid: false, error: 'Date is required' };
	}

	const date = new Date(dateString);
	const today = new Date();
	today.setHours(23, 59, 59, 999); // Fin del día

	if (isNaN(date.getTime())) {
		return { isValid: false, error: 'Invalid date format' };
	}

	if (date > today) {
		return { isValid: false, error: 'Date cannot be in the future' };
	}

	// No permitir fechas muy antiguas (más de 10 años)
	const tenYearsAgo = new Date();
	tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);

	if (date < tenYearsAgo) {
		return { isValid: false, error: 'Date cannot be more than 10 years ago' };
	}

	return { isValid: true };
}

/**
 * Valida toda la transacción
 */
export function validateTransaction(transaction: {
	name: string;
	description: string;
	amount: number | string;
	date: string;
}): ValidationResult {
	const nameValidation = validateTransactionName(transaction.name);
	if (!nameValidation.isValid) return nameValidation;

	const descValidation = validateDescription(transaction.description);
	if (!descValidation.isValid) return descValidation;

	const amountValidation = validateAmount(transaction.amount);
	if (!amountValidation.isValid) return amountValidation;

	const dateValidation = validateDate(transaction.date);
	if (!dateValidation.isValid) return dateValidation;

	return { isValid: true };
}
