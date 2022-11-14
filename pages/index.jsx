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
  if (!clubData) return <div><Loading/></div>

  return (

    <div className='index_main'>
      <TopNav />
      <div className="manage_main_div">

        <div className="manage_main_div_left">
          <SideNav />
          

        
        </div>


        <div className='manage_main_div_right'>

          
         

          

        </div>




      </div>

    </div>
  )
}

export default Index