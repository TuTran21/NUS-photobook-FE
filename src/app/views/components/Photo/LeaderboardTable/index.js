import React from 'react';
// import Table from '@material-ui/core/Table';
// import TableBody from '@material-ui/core/TableBody';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import Paper from '@material-ui/core/Paper';
import styled from 'styled-components';
import Theme from 'app/themes/styles';
import { msToTime } from 'utils/utils';
import LoadingIndicator from '../../common/LoadingIndicator';
import { Typography } from '@material-ui/core';

const TableHeader = styled.div`
	display: flex;
	height: 48px;
	width: 100%;
	background-color: ${Theme.ncpPrimaryDark};
	color: ${Theme.ncpWhite};
	font-weight: bold;
`;

const TableWrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const TableRow = styled.div`
	width: 100%;
	display: flex;
	height: 50px;
	font-size: 14px;
	text-overflow: ellipsis;
	color: ${Theme.ncpBlack1};

	background-color: ${props => (props.idx % 2 ? `${Theme.ncpDefaultBackground}` : `${Theme.ncpGray5}`)};
`;

const RankingCell = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: transparent;
	padding: 15px;
	min-width: 46px;
`;

const NameCell = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	padding: 15px;
`;

const ScoreCell = styled.div`
	min-width: 68px;
	width: auto;
	display: flex;
	align-items: center;
	padding: 15px;
`;

const TimeCell = styled.div`
	min-width: 68px;
	width: auto;
	display: flex;
	align-items: center;
	padding: 15px;
`;

function LeaderboardTable(props) {
	const { data, loading, error } = props;
	if (!data && !loading) {
		return <p style={{ textAlign: 'center' }}>Something went wrong, please try again later</p>;
	}

	let leaderboard = [];
	if (data && data.getReadingLeaderboardByResultId) {
		leaderboard = data.getReadingLeaderboardByResultId;
	}

	if (data && data.getReadingLeaderboardByTestId) {
		leaderboard = data.getReadingLeaderboardByTestId;
	}

	return (
		<TableWrapper>
			<TableHeader>
				<RankingCell>#</RankingCell>
				<NameCell>User</NameCell>
				<ScoreCell>Score</ScoreCell>
				<TimeCell>Time</TimeCell>
			</TableHeader>
			{loading && <LoadingIndicator wrapperStyle={{ padding: '50px' }}></LoadingIndicator>}
			{error && !data && <p style={{ textAlign: 'center' }}>Something went wrong, please try again later</p>}
			{leaderboard.length === 0 && !loading && (
				<TableRow key={1}>
					<Typography variant="body1" component="p" className="text-center w-100 m-2 p-2">
						No results yet
					</Typography>
				</TableRow>
			)}
			{leaderboard.map((item, idx) => (
				<TableRow key={idx} idx={idx}>
					<RankingCell>{idx + 1}</RankingCell>
					<NameCell>
						{item.user.firstName && item.user.lastName
							? item.user.firstName + ' ' + item.user.lastName
							: item.user.username}
					</NameCell>
					<ScoreCell>{item.result.scoreBand}</ScoreCell>
					<TimeCell>{msToTime(item.result.timeSpent)}</TimeCell>
				</TableRow>
			))}
		</TableWrapper>
	);
}

export default LeaderboardTable;
