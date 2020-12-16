import React from 'react';

function SkeletonRender(props) {
	const { numberOfSkeletons } = props;
	const skeletons = [];

	for (var i = 0; i < numberOfSkeletons; i++) {
		skeletons.push({ id: i });
	}

	return (
		<React.Fragment>
			{skeletons.map(skeleton => (
				<props.children {...props}></props.children>
			))}
		</React.Fragment>
	);
}

export default SkeletonRender;
