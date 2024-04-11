"use server";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function main() {
	// const user = await prisma.user.create({
	// 	data: {
	// 		name: "Sean",
	// 		email: "seancokingtin@gmail.com",
	// 		age: 28,
	// 		userPreference: {
	// 			create: {
	// 				emailUpdates: true,
	// 			},
	// 		},
	// 	},
	// });

	const user = await prisma.user.findUnique({
		where: {
			age_name: {
				age: 28,
				name: "Sean",
			},
		},
	});

	console.log(user);
}
