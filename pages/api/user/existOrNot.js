import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()










export default async function handler(
	req,
	res
) {
	
	console.log("hello there ************************************************************")



	const user = await prisma.user.findFirst({
		where: {
			mailId: req.body.mailId
		}
	})

	if (!user) {
		res.json("false");
		

	}
	else {

		res.json("true");
		

	}


	// res.send("helo")

	res.status(200).json(club)


}



