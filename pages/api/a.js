import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
export default async function handler(
	req,
	res
) {

	const data = localStorage.getItem("email")
	console.log("data", data)
	
	res.status(200).json("hello")
}