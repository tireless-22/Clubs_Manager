import React from 'react'
import TopNav from '../components/topNav'
import useSWRImmutable from 'swr/immutable';
import Image from 'next/image'
import { getFetcher } from '../utils/swr_utils';
import Link from 'next/link';
import SideNav from '../components/sideNav';
import Loading from '../components/loading';

import MainFooter from '../components/mainFooter';



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

    <div className='index_main'>


      {/* Navbar */}

      <div className='topNav dark:bg-gray-900'>
        <div className='leftNav'>
          <p className='text-2xl text-white ml-8 '>
            Website Name
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

        <div className='landing_main_div_college bg-slate-300'>

          <h1>
            Some crucial information about the College
          </h1>

        </div>
        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-3xl'>
            Technical Clubs
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

                  <div className="landing_page_club_main_div font-[' Open_Sans']">
                   
                    <h1>
                      hi there
                    </h1>
                  </div>
                </div>
              </Link>
            ))
          }


        </div>


        <div className='flex flex-col justify-center items-center'>
          <h1 className='text-3xl'>
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

                </div>
              </Link>

            ))
          }


        </div>

        <div class="row">
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3798.3861539630434!2d83.34015411494428!3d17.820523887820432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a395bedc7efb603%3A0x87c06caab54e902a!2sGVP%20College%20of%20Engineering%20(Autonomous)!5e0!3m2!1sen!2sin!4v1598167973876!5m2!1sen!2sin" width="100%" height="233" ></iframe>
        </div>


      </div>

      <MainFooter/>


    </div>
  )
}

export default Index