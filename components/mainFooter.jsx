import React from 'react'
// import logo from "../../images/logo.png"

import logo from "../Images/logo.png"
import Image from 'next/image'

const MainFooter = () => {
	return (




		<div className='footer_main'>
			<div className='footer_Top'>


				<div className='footer_left'>
					<h1 className='f32'> Contact</h1>
					<p className='text-xl'>Email : gvpce@yahoo.com
						</p>

					
				</div>
				<div className='footer_middle'>
					<h1 className='f48'>Gvpce All Clubs</h1>
					<p className='text-xl' style={{ textAlign: "justify" }}>To evolve into and sustain as a Centre of Excellence in Technological Education and Research with a  holistic approach</p>
				

				</div>
				<div className='footer_right'>

					<Image src={logo} width={200} height={200} />
				</div>



			</div>


			<div className='footer_bottom'>
				<div className='text-base ml-8'>
					Copy Right Â© 2021 Gayatri Vidya Parishad College of Engineering (Autonomous). All Rights Reserved
				</div>


			</div>




		</div>

	)
}

export default MainFooter