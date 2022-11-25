import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default async function handler(
	req,
	res
) {
	console.log("hello there ************************************************************")
	console.log(req.body)


	const club = await prisma.club.update({
		where: {
			name: req.body.clubName,
		},
		data: {
			about:req.body.aboutTheClub,
	
			facebookUrl:req.body.facebookUrl,
			gmail:req.body.gmail,
			instagramUrl:req.body.instagramUrl,
			quotation:req.body.quotation,
			twitterUrl:req.body.twitterUrl,
			youtubeUrl:req.body.youtubeUrl,

		},
	})




	res.status(200).json(club)


}



