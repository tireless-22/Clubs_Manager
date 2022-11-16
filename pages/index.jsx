import React from 'react'
import TopNav from '../components/topNav'
import useSWRImmutable from 'swr/immutable';
import Image from 'next/image'
import { getFetcher } from '../utils/swr_utils';
import Link from 'next/link';
import SideNav from '../components/sideNav';
import Loading from '../components/loading';



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



  if (clubDataError) return <div>failed to load</div>
  if (!clubData) return <div><Loading /></div>

  console.log(userMail)


  return (

    <div className='index_main'>

      <div className='topNav dark:bg-gray-900'>
        <div className='leftNav'>
          <p className='text-2xl text-white ml-8 '>
            Website Name
          </p>
          <Image src="https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2Fde05aae1-54e0-4f3d-8e19-a87220731f81?alt=media" width={50} height={50} />
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

        <div className='landing_main_div_college bg-slate-300'>

          <h1>
            Some crucial information about the College
          </h1>

        </div>

        <div className='landing_main_div_clubs'>
          {
            clubData.map((club) => (
              <Link href={`/clubs/${club.name}`} key={club.id}>
                <div className='landing_page_club_card' >
                  <div className='landing_page_club_card_image'>

                    <Image src={`https://firebasestorage.googleapis.com/v0/b/contest-4f331.appspot.com/o/images%2F${club.fileUrl}?alt=media`} width={200} height={200} />

                  </div>
                  <div className='landing_page_club_card_image'>
                    <h1>
                      {club.name}
                    </h1>

                  </div>
                  <div className='landing_page_club_card_image'>
                    <h1>
                      {club.description}
                    </h1>

                  </div>

                </div>



              </Link>





            ))
          }


        </div>
      </div>

    </div>
  )
}

export default Index