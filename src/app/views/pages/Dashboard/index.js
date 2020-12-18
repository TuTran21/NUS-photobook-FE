import React, { useMemo, useEffect } from 'react';

// import QuickStatsChart from '../../widgets/QuickStatsChart';
// import OrderStatisticsChart from '../../widgets/OrderStatisticsChart';
// import OrdersWidget from '../../widgets/OrdersWidget';
// import SalesBarChart from '../../widgets/SalesBarChart';
// import DownloadFiles from '../../widgets/DownloadFiles';
// import NewUsers from '../../widgets/NewUsers';
// import LatestUpdates from '../../widgets/LatestUpdates';

// import RecentActivities from '../../widgets/RecentActivities';
import NewUsers from './NewUsers';

export default function Dashboard(props) {
	useEffect(() => {}, []);

	return (
		<>
			<div className="row">
				{/* <div className="col-xl-4">DownloadFiles</div> */}
				<div className="col-xl-4">
					<NewUsers></NewUsers>
				</div>
				<div className="col-xl-4">LatestUpdates</div>
			</div>

			{/* <div className="row">
        <div className="col-xl-8"></div>
        <div className="col-xl-4">
          <AuthorsProfit />
        </div>
      </div> */}

			<div className="row">
				<div className="col-xl-8">Best Seller</div>
				<div className="col-xl-4">
					RecentActivities
					{/* <RecentActivities /> */}
				</div>
			</div>
		</>
	);
}
