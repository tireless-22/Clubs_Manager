import React from 'react'
import TopNav from '../components/topNav'
import useSWRImmutable from 'swr/immutable';
import Image from 'next/image'
import { getFetcher } from '../utils/swr_utils';
import Link from 'next/link';
import SideNav from '../components/sideNav';
import Loading from '../components/loading';



const Index = () => {

  const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/getAll', getFetcher)

  console.log(clubData)



  if (clubDataError) return <div>failed to load</div>
  if (!clubData) return <div><Loading /></div>


  return (

    <div className='index_main'>
      <TopNav />
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