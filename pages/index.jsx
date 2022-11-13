import React from 'react'
import TopNav from '../components/topNav'
import useSWRImmutable from 'swr/immutable';
import Image from 'next/image'
import { getFetcher } from '../utils/swr_utils';
import Link from 'next/link';

const Index = () => {

  const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/getAll', getFetcher)

  if (clubDataError) return <div>failed to load</div>
  if (!clubData) return <div>loading...</div>

  return (

     <div className='index_main'>
      <TopNav />
      <div className="index_post_container">
        <div>


          <aside className="w-64 mt-1 ml-1 mr-1" aria-label="Sidebar">
            <div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-700">
              <ul className="space-y-2">

                {clubData.map((club) => (
                  <li key={club.id}>
                    <Link href={`/clubs/${club.name}`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                    
                    
                      <span className="ml-3">{club.name}</span>
                  </Link>
                </li>
                 
                ))}



                

              </ul>
            </div>
          </aside>
          {/* <div key={club.name}>
            {club.name}
          </div> */}












          





        </div>

        
      </div>
    </div>


   
  )
}

export default Index