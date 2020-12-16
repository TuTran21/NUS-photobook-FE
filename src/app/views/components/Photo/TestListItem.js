import React, { memo } from 'react';
import { Button, Paper } from '@material-ui/core';
import styled from 'styled-components';
import moment from 'moment';
import Theme from 'app/themes/styles';
import { MenuBookOutlined, HeadsetOutlined, CreateOutlined, MicOutlined } from '@material-ui/icons';
import { Rating } from '@material-ui/lab';
import { useMutation } from '@apollo/client';
import TestMutations from 'graphql/mutations/Test/';
import { roundNumberToTwoDecimals } from 'utils/utils';
import { withSnackbar } from 'notistack';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	${props =>
		props.nomargin === 'false' &&
		`margin-top: 35px;
	`}
	padding: 40px 0px;

	@media only screen and (max-width: 670px) {
		margin-top: 30px;
	}
`;

const TestTitle = styled.h2`
	color: #646c9a;
	font-size: 24px;
	font-weight: 600;
	line-height: 1.2;
	margin-bottom: 0px;

	&:hover {
		color: #848aae;
		cursor: pointer;
	}

	@media only screen and (max-width: 670px) {
		text-align: center;
	}
`;

const TestBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const TestInfoBlock = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
	margin: 0px 0px 20px;
	height: auto;

	@media only screen and (max-width: 670px) {
		flex-direction: column;
		justify-content: center;
	}
`;

const TextDescriptionBlock = styled.div`
	display: flex;
	flex-direction: column;
	width: 62%;
	@media only screen and (max-width: 670px) {
		width: 100%;
		align-items: center;
		margin-top: 15px;
	}
`;

const InfoBlock = styled.div`
	margin: 0px 0px 0px 0px;

	&:hover {
		cursor: pointer;
	}
	@media only screen and (max-width: 670px) {
		text-align: center;
	}
`;

const BookImgWrapper = styled.div`
	max-height: 200px;
	max-width: 200px;
	&:hover {
		cursor: pointer;
	}
	@media only screen and (max-width: 670px) {
		margin: 20px 0 10px;
	}
`;

const BookImg = styled.img`
	width: 200px;
	height: 200px;
`;

const InfoText = styled.p`
	padding: 0px;
	color: #646c9a;
	font-size: 14px;
	margin: 0px;
	font-weight: 500;
`;

const VoteAmount = styled.em`
	position: relative;
	color: #536b83;
	font-size: 12px;

	padding-left: 5px;
	top: -4px;
	line-height: 1.5;
`;

const TestTypeBlock = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	font-size: 11px;
	font-weight: bold;
	letter-spacing: 2.75px;
	line-height: 24px;
	margin-bottom: 20px;

	color: ${props =>
		props.islistening === 'true'
			? Theme.ncpSecondaryDark
			: props.isreading === 'true'
			? Theme.ncpPrimaryDark
			: props.iswriting === 'true'
			? Theme.ncpThirdaryDark
			: Theme.ncpFourtharyDark};
`;

const TakeTestHolder = styled.div`
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const RatingText = styled.span`
	font-size: 16px;
	font-weight: 600;
	position: relative;
	color: #f9a95a;
	margin: 0px 4px 0px 0px;
	top: -4px;
`;

const TakeTestButton = styled(Button)`
	height: 32px;
	padding: 0 20px;
	color: ${Theme.ncpWhite};

	background-color: ${props =>
		props.islistening === 'true'
			? Theme.ncpSecondaryDark
			: props.isreading === 'true'
			? Theme.ncpPrimaryDark
			: props.iswriting === 'true'
			? Theme.ncpThirdaryDark
			: Theme.ncpFourtharyDark};

	:hover {
		background-color: ${props =>
			props.islistening === 'true'
				? Theme.ncpSecondaryHover
				: props.isreading === 'true'
				? Theme.ncpPrimaryHover
				: props.iswriting === 'true'
				? Theme.ncpThirdaryHover
				: Theme.ncpFourtharyHover};
	}
`;

const ResponsiveTakeTestText = styled.span`
	margin-left: 5px;
	@media only screen and (max-width: 480px) {
		display: none;
	}
`;

const TakeText = 'Take';
const TestText = 'Test';

function RenderTakeTestButtons(props) {
	const { test, selectTest, hasTakeTestButtons } = props;

	if (!test || !hasTakeTestButtons) {
		return null;
	}

	return (
		<TakeTestHolder>
			<TestBlock>
				<TestTypeBlock isreading="true">
					<MenuBookOutlined fontSize="large"></MenuBookOutlined>
					READING
				</TestTypeBlock>
				{test.testDetails.readingTest ? (
					<TakeTestButton
						size="small"
						color="primary"
						variant="contained"
						onClick={() => selectTest(test)}
						isreading="true"
					>
						{TakeText}
						<ResponsiveTakeTestText> {TestText}</ResponsiveTakeTestText>
					</TakeTestButton>
				) : (
					<TakeTestButton isreading="true" size="sma" disabled={true}>
						{TakeText}
						<ResponsiveTakeTestText> {TestText}</ResponsiveTakeTestText>
					</TakeTestButton>
				)}
			</TestBlock>
			<TestBlock>
				<TestTypeBlock islistening="true">
					<HeadsetOutlined fontSize="large"></HeadsetOutlined>
					LISTENING
				</TestTypeBlock>
				{test.testDetails.listeningTest ? (
					<TakeTestButton
						size="small"
						color="secondary"
						variant="contained"
						onClick={() => selectTest(test)}
						islistening="true"
					>
						{TakeText}
						<ResponsiveTakeTestText> {TestText}</ResponsiveTakeTestText>
					</TakeTestButton>
				) : (
					<TakeTestButton islistening="true" size="small" disabled={true}>
						{TakeText}
						<ResponsiveTakeTestText> {TestText}</ResponsiveTakeTestText>
					</TakeTestButton>
				)}
			</TestBlock>
			<TestBlock>
				<TestTypeBlock iswriting="true">
					<CreateOutlined fontSize="large"></CreateOutlined>
					WRITING
				</TestTypeBlock>
				{test.testDetails.writingTest ? (
					<TakeTestButton
						size="small"
						color="primary"
						variant="contained"
						size="small"
						onClick={() => selectTest(test)}
						iswriting="true"
					>
						{TakeText}
						<ResponsiveTakeTestText> {TestText}</ResponsiveTakeTestText>
					</TakeTestButton>
				) : (
					<TakeTestButton iswriting="true" disabled={true} size="small">
						{TakeText}
						<ResponsiveTakeTestText>{TestText}</ResponsiveTakeTestText>
					</TakeTestButton>
				)}
			</TestBlock>
			<TestBlock>
				<TestTypeBlock isspeaking="true">
					<MicOutlined fontSize="large"></MicOutlined>
					SPEAKING
				</TestTypeBlock>
				{test.testDetails.speakingTest ? (
					<TakeTestButton
						size="small"
						color="primary"
						variant="contained"
						onClick={() => selectTest(test)}
						isspeaking="true"
					>
						{TakeText}
						<ResponsiveTakeTestText> {TestText}</ResponsiveTakeTestText>
					</TakeTestButton>
				) : (
					<TakeTestButton isspeaking="true" disabled={true} size="small">
						{TakeText}
						<ResponsiveTakeTestText> {TestText}</ResponsiveTakeTestText>
					</TakeTestButton>
				)}
			</TestBlock>
		</TakeTestHolder>
	);
}

function TestListItem(props) {
	const { test, addTest, history, hasTakeTestButtons, viewOnly = false, noMargin = false } = props;
	// Select test on button click
	const selectTest = async test => {
		if (viewOnly) {
			return;
		}
		// If disabled, test will be loaded and fetch from server after the user
		// redirected to test screen (after select test) - Increase loading time
		// for test details fetching but reduce fetch time for test collection fetching
		// await addTest(test);
		return history.push(`/test/${test.id}/reading`);
	};

	const handleClickTestDetails = () => {
		if (viewOnly) {
			return;
		}
		return history.push(`/test/${test.id}`);
	};

	// Hooks
	const [submitRating, ratingRes] = useMutation(TestMutations.RATE_TEST, {
		onCompleted: () =>
			props.enqueueSnackbar('Thank you for your rating', {
				variant: 'success',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			}),
		onError: () =>
			props.enqueueSnackbar('Something went wrong, please make sure you are connected to the internet', {
				variant: 'error',
				anchorOrigin: {
					vertical: 'top',
					horizontal: 'right',
				},
			}),
	});

	const handleSubmitRating = star => {
		if (viewOnly) {
			return;
		}
		submitRating({ variables: { id: test.id, star } });
	};

	// Constanst for render
	const {
		title,
		createdAt,
		publishDate,
		views,
		rating,
		testsTaken,
		image = 'https://reader.zlibcdn.com/books/d3fb5022dc64a37e78d449cd0347072c/1.jpg',
	} = test;
	const formatPublishDate = moment(publishDate).format('DD-MMM-YYYY');
	return (
		<Wrapper nomargin={noMargin.toString()} className="gutter-b kt-portlet kt-portlet--height-fluid">
			<TestInfoBlock>
				<BookImgWrapper>
					<BookImg onClick={() => handleClickTestDetails()} src={image}></BookImg>
				</BookImgWrapper>
				<TextDescriptionBlock>
					<TestTitle onClick={() => handleClickTestDetails()}>{title}</TestTitle>
					<InfoBlock onClick={() => handleClickTestDetails()}>
						<RatingText>{roundNumberToTwoDecimals(rating.starAmount)}</RatingText>
						<Rating
							name="simple-controlled"
							precision={0.5}
							value={roundNumberToTwoDecimals(rating.starAmount)}
							onChange={(event, newValue) => {
								handleSubmitRating(newValue);
							}}
						/>
						<VoteAmount>({rating.voteAmount} votes)</VoteAmount>
					</InfoBlock>
					<InfoBlock onClick={() => handleClickTestDetails()}>
						<InfoText>Published on: {formatPublishDate}</InfoText>
						<InfoText>Views: {views}</InfoText>
						<InfoText>Tests taken: {testsTaken}</InfoText>
					</InfoBlock>
				</TextDescriptionBlock>
			</TestInfoBlock>

			<RenderTakeTestButtons
				hasTakeTestButtons={hasTakeTestButtons}
				test={test}
				selectTest={selectTest}
			></RenderTakeTestButtons>
		</Wrapper>
	);
}

export default memo(withSnackbar(TestListItem));
