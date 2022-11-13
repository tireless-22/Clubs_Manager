import React from 'react'
import useSWRImmutable from 'swr/immutable';

import { getFetcher } from '../utils/swr_utils';


const SideNav = () => {

	const { data: clubData, error: clubDataError } = useSWRImmutable('/api/club/getAll', getFetcher)

	if (clubDataError) return <div>failed to load</div>
	if (!clubData) return <div>loading...</div>
	
	return (
		<div>
			{clubData.map((club) => (
				<div key={club.name}>
					{club.name}
				</div>
			))}





		</div>
	)
}

export default SideNav