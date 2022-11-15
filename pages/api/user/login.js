import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")

	const mailId = req.body.mailId;
	const password = req.body.password;
	console.log("passwrord",password)



	const user = await prisma.user.findFirst({
		where: {
			mailId: mailId
		}
	})
	console.log(user)

	if (!user) {
		console.log("user not found")
		res.json("false").status(200);
		
	}
	else {
		console.log(user.password)
		console.log(req.body.password)
		if (user.password === password) {
			console.log("hello")
			res.json("true")
		}
		else {
			console.log("wrong password")
			res.json("false")
		
		}




	}

}

