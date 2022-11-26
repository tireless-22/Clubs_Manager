import React from 'react'
// import TopNav from '../components/topNav'
import useSWRImmutable from 'swr/immutable';
import Image from 'next/image'
import { getFetcher } from '../utils/swr_utils';
import Link from 'next/link';
import SideNav from '../components/sideNav';
import Loading from '../components/loading';
import background from "../Images/topp.png"

import MainFooter from '../components/mainFooter';
import logo from "../Images/logo.png"


const Index = () => {

  let userMail = "null"

  if (typeof window !== 'undefined') {
    console.log(localStorage.getItem("email"))
    localStorage.getItem("email") ? userMail = localStorage.getItem("email") : userMail = "null";
    userMail = localStorage.getItem("email")
  }

  console.log(userMail)







  const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/getAll', getFetcher)

  console.log(clubData)

  const { data: technicalClubs, error: technicalClubsError } = useSWRImmutable('/api/club/getTechnical', getFetcher)

  console.log(technicalClubs)


  const { data: socialClubs, error: socialClubsError } = useSWRImmutable('/api/club/getSocial', getFetcher)

  console.log(socialClubs)






  if (clubDataError) return <div>failed to load</div>
  if (!technicalClubs || !socialClubs) return <div><Loading /></div>

  console.log(userMail)


  return (

    <div style={{
      backgroundImage: `url(${background})`,
      width: '100%',
      // height: '100%',
    }} className='index_main'>


      {/* Navbar */}

      <div className='topNav '>
        <div className='leftNav'>
          <div className='logoDiv2'>

            <Image src={logo} width={50} height={50} className="logo_image" />

          </div>
          <p className='text-2xl text-white ml-8 '>
            GVP Community
          </p>
        </div>
        {
          userMail ? (
            <div className='rightNav'>
              <p className='text-base text-white mr-10' onClick={() => window.location.href = '/'}>
                Clubs
              </p>
              {
                userMail !== "admin" ? (
                  <p className='text-base text-white mr-10 ' onClick={() => window.location.href = '/manager_member'}>
                    Manager / Member
                  </p>
                ) : (
                  <p className='text-base text-white  mr-10' onClick={() => window.location.href = '/admin'}>
                    Admin
                  </p>
                )
              }
              <p className='text-base text-white bg-blue-700 pt-2 pb-2 pl-2 pr-2  mr-10' onClick={
                () => {
                  localStorage.removeItem("email");
                  window.location.href = "/"
                }
              }>
                logout
              </p>

            </div>

          ) : (

            <div className='rightNav'>
              <p className='text-base text-white mr-10' onClick={() => window.location.href = '/'}>
                Clubs
              </p>
              <p className='text-base text-white mr-10 ' onClick={() => window.location.href = '/manager_member'}>
                Manager / Member
              </p>
              <p className='text-base text-white  mr-10' onClick={() => window.location.href = '/admin'}>
                Admin
              </p>

            </div>





          )
        }


      </div>


      <div className="landing_main_div">
        <Image src={background} />




        <div className="flex_center">
          <h1 className='f48'>
            Clubs Mission

          </h1>

        </div>

        <div className='flex_center'>
          <p className='f25 landing_page_Mission_div'>
            To express our profound gratitude to
            you for your kindness geared towards the destitute. We really wish to thank GAYATRI VIDYA
            PARISHAD COLLEGE OF ENGINEERING for their support and encouragement to the Hearts of
            Humanity club which is aimed at
          </p>


        </div>

        <div className='flex_center'>

          <p className='f25 landing_page_Mission_div>'>
            “Bringing cheers among the destitute in orphanages”
          </p>
        </div>



        <div className='flex flex-col justify-center items-center mt-12 mb-6'>
          <h1 className='f48'>
            {/* <u> */}

            Technical Clubs
            {/* </u> */}
          </h1>

        </div>

        <div className='landing_main_div_clubs'>
          {
            technicalClubs.map((club) => (
              <Link href={`/clubs/${club.name}`} key={club.id}>
                <div class="main_club_page_club_container">


                  <div class="main_club_page_club_container_mini">
                    <Image src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${club.fileUrl}?alt=media`} width={200} height={200} className="landing_page_round_image" />
                  </div>

                  <div className='main_club_card_text'>
                    <div className='text-xl'>
                      {club.name}
                    </div>
                    <div className='text-sm'>
                      <button className='orange_button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        View Club

                      </button>
                    </div>

                    <div className='card_values_container'>
                      <div className='card_values_container_row'>
                        <div >{club.event.length}</div>
                        <div>{club.userClub.length}</div>

                      </div>
                      <div className='card_values_container_row'>
                        <div>

                          Volunteers &nbsp;
                        </div>
                        <div>


                          Events

                        </div>



                      </div>

                    </div>
                  </div>
                </div>
              </Link>
            ))
          }


        </div>


        <div className='flex flex-col justify-center items-center mb-6 mt-12'>
          <h1 className=' f48'>
            Social Clubs
          </h1>

        </div>

        <div className='landing_main_div_clubs'>
          {
            socialClubs.map((club) => (
              <Link href={`/clubs/${club.name}`} key={club.id}>
                <div class="main_club_page_club_container">
                  <div class="main_club_page_club_container_mini">
                    <Image src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${club.fileUrl}?alt=media`} width={200} height={200} className="landing_page_round_image" />
                  </div>

                  <div className='main_club_card_text'>
                    <div className='text-xl'>
                      {club.name}
                    </div>
                    <div className='text-sm'>
                      <button className='orange_button hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                        View Club

                      </button>
                    </div>

                    <div className='card_values_container'>
                      <div className='card_values_container_row'>
                        <div >{club.event.length}</div>
                        <div>{club.userClub.length}</div>

                      </div>
                      <div className='card_values_container_row'>
                        <div>

                          Volunteers &nbsp;
                        </div>
                        <div>
                          

                          Events

                        </div>



                      </div>

                    </div>
                  </div>

                </div>
              </Link>

            ))
          }


        </div>

        <div class="row mt-16">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.3861539630434!2d83.34015411494428!3d17.820523887820432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395bedc7efb603%3A0x87c06caab54e902a!2sGVP%20College%20of%20Engineering%20(Autonomous)!5e0!3m2!1sen!2sin!4v1598167973876!5m2!1sen!2sin" width="100%" height="233" ></iframe>
        </div>


      </div>

      <MainFooter />


    </div>
  )
}

export default Index