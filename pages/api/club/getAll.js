import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)


	const clubs = await prisma.club.findMany({})


	// res.send("helo")

	res.status(200).json(clubs)


}



