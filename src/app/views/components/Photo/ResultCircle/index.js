import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import styled from 'styled-components';
import Theme from 'app/themes/styles';

const Label = styled.p`
	display: block;
	margin: 0px;
	font-size: 13px;
	font-weight: 800;
	color: #787878;
`;

const BackgroundCircle = styled(CircularProgress)`
	position: absolute;
	color: ${Theme.ncpLight} !important;
`;

const Wrapper = styled(Box)`
	display: flex;
	justify-content: center;
	align-items: center;
`;

export function CircularProgressWithLabel(props) {
	const { label } = props;
	return (
		<Wrapper position="relative" display="inline-flex">
			<CircularProgress variant="static" {...props} style={{ zIndex: 2 }} />
			<BackgroundCircle
				variant="static"
				value={100}
				size={props.size}
				thickness={props.thickness}
			></BackgroundCircle>
			<Box
				top={0}
				left={0}
				bottom={0}
				right={0}
				position="absolute"
				display="flex"
				alignItems="center"
				justifyContent="center"
				flexDirection="column"
			>
				<Label variant="caption" component="div" color="textSecondary">
					{label}
				</Label>
				{props.children}
			</Box>
		</Wrapper>
	);
}

CircularProgressWithLabel.propTypes = {
	label: PropTypes.string,
	value: PropTypes.number.isRequired,
};

export default function CircularIncrement(props) {
	const { value = 100, interval = 20, incrementByValue = 0.5, label = '' } = props;
	const [progress, setProgress] = React.useState(0);
	React.useEffect(() => {
		const timer = setInterval(() => {
			setProgress(prevProgress => (prevProgress == value ? value : prevProgress + incrementByValue));
		}, interval);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return (
		<React.Fragment>
			<CircularProgressWithLabel value={progress} label={label} {...props} />
		</React.Fragment>
	);
}
