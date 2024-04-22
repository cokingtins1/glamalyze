import { PrismaClient, Product, Review, Reviewer, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function seedUser(userData: User[]) {
	await prisma.user.createMany({ data: userData });
}

export async function seedProduct(userData: Product[]) {
	await prisma.product.createMany({ data: userData });
}

export async function seedReviewer(userData: Reviewer[]) {
	await prisma.reviewer.createMany({ data: userData });
}


