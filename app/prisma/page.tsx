"use client";

import { main } from '../actions/prisma/users';

export default function page() {
	return (
		<form action={main}>
			<button type='submit' className='bg-green-600 p-2 border rounded-sm'>Run Script</button>
		</form>
	);
}
