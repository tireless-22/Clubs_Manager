


const nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'gvpceallclubs@gmail.com',
		pass: 'rmieixubnwdpzssw'
	}
});




export default async function handler(
	req,
	res
) {

	const email = req.body.mailId;
	const club = req.body.club;
	const type = req.body.type
	console.log(email)
	console.log(club)
	console.log(type)



	var mail = {
		from: 'gvpceallclubs@gmail.com',
		to: email,
		subject: "Reset you password by clicking on the link",
		text: `Hi ${email}, Gvpce club added you as ${type} for the ${club}. Please Reset you password by clicking on the link http://localhost:3000/verify?q=${email}`,
	}


	transporter.sendMail(mail, (err, data) => {
		if (err) {
			console.log(err)
			res.json({
				status: 'fail'
			})
		} else {
			console.log(data)
			res.json({
				status: 'success'
			})
		}
	})


	res.status(200).json("hello")


}



