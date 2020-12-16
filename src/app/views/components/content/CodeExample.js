/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid */
import React, { useMemo, useState } from 'react';
import { dedent } from 'dentist';
import copy from 'clipboard-copy';
import { Tooltip } from '@material-ui/core';
import { Portlet, PortletBody, PortletHeader, PortletHeaderToolbar } from './Portlet';

export function CodeBlock({ code, language, disableCopy }) {
	const [isCopySucceed, setIsCopySucceed] = useState(false);
	const children = useMemo(() => dedent(code), [code]);

	return (
		<div className="kt-portlet__code">
			{!disableCopy && (
				<Tooltip
					title="Copied"
					placement="left"
					open={isCopySucceed}
					onClose={() => {
						setIsCopySucceed(false);
					}}
				>
					<a
						href="#"
						className="kt-portlet__code-copy"
						onClick={() =>
							copy(code).then(() => {
								setIsCopySucceed(true);
							})
						}
					>
						<i className="la la-copy" />
					</a>
				</Tooltip>
			)}
		</div>
	);
}

export default function CodeExample({ jsCode, children, beforeCodeTitle }) {
	const [isCodeVisible, setIsCodeVisible] = useState(false);

	return (
		<Portlet>
			<PortletHeader
				title={beforeCodeTitle}
				toolbar={
					jsCode && (
						<PortletHeaderToolbar>
							<button
								type="button"
								onClick={() => setIsCodeVisible(wasVisible => !wasVisible)}
								className="btn btn-clean btn-sm btn-icon btn-icon-md ng-star-inserted"
							>
								<i className="la la-code" />
							</button>
						</PortletHeaderToolbar>
					)
				}
			/>

			<PortletBody>
				{jsCode && isCodeVisible && <CodeBlock language="javascript" code={jsCode} />}

				{children && <div className="kt-portlet__preview">{children}</div>}
			</PortletBody>
		</Portlet>
	);
}
