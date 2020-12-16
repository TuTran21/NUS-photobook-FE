import React from 'react';

function NewUsers(props) {
	return (
		<div className="kt-portlet kt-portlet--height-fluid">
			<div className="kt-portlet__head">
				<div className="kt-portlet__head-label">
					<h3 className="kt-portlet__head-title">New Users</h3>
				</div>
			</div>
			<div className="kt-portlet__body">
				<div className="kt-widget4">
					<div className="kt-widget4__item ">
						<div className="kt-widget4__pic kt-widget4__pic--pic ">
							<img alt="" src={'asdadsada'} />
						</div>
						<div className="kt-widget4__info ">
							<a className="kt-widget4__username" href="https://keenthemes.com.my/metronic">
								Nick Stone
							</a>
							<a className="kt-widget4__title" href="https://keenthemes.com.my/metronic" />
							<p className="kt-widget4__text ">Visual Designer, Github Inc.</p>
						</div>
						<a className="btn btn-sm btn-label-dark">Follow</a>
					</div>
				</div>
			</div>
		</div>
	);
}

export default NewUsers;
