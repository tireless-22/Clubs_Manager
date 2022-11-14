
import React from 'react'
import useSWRImmutable from 'swr/immutable';

import { getFetcher } from '../utils/swr_utils';
import Image from 'next/image';
import Link  from 'next/link';

const SideNav = () => {

	const { data: clubNames, error: clubNamesError } = useSWRImmutable('/api/club/getNames', getFetcher)
	console.log(clubNames)

	if (clubNamesError) return <div>failed to load</div>
	if (!clubNames) return <div>loading...</div>
	
	return (
		<div>


			<aside className="w-64 mt-1 ml-1 mr-1" aria-label="Sidebar">
				<div className="overflow-y-auto py-4 px-3 bg-gray-50 rounded dark:bg-gray-700">
					<ul className="space-y-2">

						{clubNames.map((club) => (
							<li key={club.id}>
								<Link href={`/clubs/${club.name}`} className="flex items-center p-2 text-base font-normal text-gray-900 rounded-lg dark:text-white hover:bg-gray-500  dark:hover:bg-gray-400">


									<span className="ml-3">{club.name}</span>
								</Link>
							</li>

						))}
					</ul>
				</div>
			</aside>
			

		</div>

	)
}

export default SideNav