import React from 'react';
import { Avatar, Typography, CircularProgress, Box, Tooltip, Button } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { CircularProgressWithLabel } from '../Photo/ResultCircle';
import styled from 'styled-components';
import { Help } from '@material-ui/icons';
import LoadingIndicator from '../common/LoadingIndicator';
import { roundNumberToTwoDecimals } from 'utils/utils';

const OverallScoreWrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: space-evenly;
	align-items: center;
	margin-top: 20px;
`;

const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	large: {
		width: '140px',
		height: '140px',
	},

	title: {},
	extraInfo: {
		fontWeight: '300',
		textAlign: 'center',
		fontSize: '14px',
	},
	wrapper: {
		padding: '40px',
	},
	noMargin: {
		margin: '0px',
	},
}));

const OverallTooltip = withStyles({
	tooltip: {
		fontSize: '12px',
	},
})(Tooltip);

const OverallScoreTitleWrapper = styled.div`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;

function UserStatistic(props) {
	const { loading, error, data, refetch } = props;
	const classes = useStyles();

	if (loading) {
		return (
			<div className={classes.wrapper + ' ' + 'card card-custom card-stretch gutter-b'}>
				<OverallScoreTitleWrapper>
					<Typography variant="h5" component="p">
						Overall Score
					</Typography>
					<LoadingIndicator></LoadingIndicator>
				</OverallScoreTitleWrapper>
			</div>
		);
	}

	if (error) {
		return (
			<div className={classes.wrapper + ' ' + 'card card-custom card-stretch gutter-b'}>
				<OverallScoreTitleWrapper>
					Something went wrong,{' '}
					<Button onClick={() => refetch()} href="#text-buttons" color="primary">
						Click me{' '}
					</Button>
					to reload.
				</OverallScoreTitleWrapper>
			</div>
		);
	}

	const overallScore = data.getOverallScore;
	const readingScoreRound = roundNumberToTwoDecimals(overallScore.reading);
	const writingScoreRound = roundNumberToTwoDecimals(overallScore.writing);
	const listingScoreRound = roundNumberToTwoDecimals(overallScore.listening);

	const percentage = value => {
		return (value * 100) / 9;
	};

	return (
		<div className={classes.wrapper + ' ' + 'card card-custom card-stretch gutter-b'}>
			<OverallScoreTitleWrapper>
				<Typography variant="h5" component="p">
					Overall Score
				</Typography>
				<OverallTooltip title="Average score based on your test results" placement="top">
					<Help></Help>
				</OverallTooltip>
			</OverallScoreTitleWrapper>

			<OverallScoreWrapper>
				<CircularProgressWithLabel label="Reading" value={percentage(readingScoreRound)} size="80px">
					<p className={classes.noMargin}>{readingScoreRound}</p>
				</CircularProgressWithLabel>
				<CircularProgressWithLabel
					label="Writing"
					value={percentage(writingScoreRound)}
					color="secondary"
					size="80px"
				>
					<p className={classes.noMargin}>{writingScoreRound}</p>
				</CircularProgressWithLabel>
				<CircularProgressWithLabel
					label="Listening"
					value={percentage(listingScoreRound)}
					color="inherit"
					size="80px"
				>
					<p className={classes.noMargin}>{listingScoreRound}</p>
				</CircularProgressWithLabel>
			</OverallScoreWrapper>
		</div>
	);
}

export default UserStatistic;
