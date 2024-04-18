export function getNumber(text: string | null) {
	if (!text) return null;
	const regex = /(\d+)/;
	const match = text.match(regex);

	const number = match ? parseInt(match[0]) : null;
	return number;
}
