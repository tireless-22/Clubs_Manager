import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")

	const mailId = req.body.mailId;
	const password = req.body.password;
	const newPassword = req.body.newPassword;
	const newPassword1 = req.body.newPassword1;

	console.log("passwrord", password)

	if (mailId == "admin") {
		if (password == "admin") {
			res.status(200).json("true")
		} else {
			res.status(400).json("false")
		}
	}



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
			const updateUser = await prisma.user.update({
				where: {
					mailId: mailId,
				},
				data: {
					password: newPassword,
				},
			})
			
			res.json("true")
		}
		else {
			console.log("wrong password")
			res.json("false")

		}
	}

}

