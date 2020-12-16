import React from 'react';
import styled from 'styled-components';
import theme from 'app/themes/styles';

const Number = styled.span`
	display: inline-block;
	width: 30px;
	height: 30px;
	border-radius: 50%;
	background-color: ${theme.ncpPrimary};
	font-size: 14px;
	font-weight: 700;
	text-align: center;
	line-height: 30px;
	color: #fff;
	margin: 0 6px 0 0;

	${props => (props.hasAlphabet ? 'background-color: #ddd;    color: #282828;' : '')}
`;

const QuestionNumber = props => {
	return <Number hasAlphabet={props.hasAlphabet}>{props.children}</Number>;
};

export default QuestionNumber;
