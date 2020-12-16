import React from 'react';

import mainLogo from 'app/assets/media/logos/big.png';
class SplashScreen extends React.Component {
	render() {
		return (
			<div id="splash-screen" className="kt-splash-screen">
				<img src={mainLogo} alt="OT logo" style={{ height: '200px', width: '250px' }} />

				<svg className="spinner" viewBox="0 0 50 50">
					<circle className="path" cx="25" cy="25" r="20" fill="none" strokeWidth="5"></circle>
				</svg>
			</div>
		);
	}
}

export default SplashScreen;
