import React from 'react';
import styled from 'styled-components';
import { questionIndexing, splitStringByBlank } from 'utils/utils';
import CustomInput from '../../Form/EngageInput/index';
import QuestionNumber from '../QuestionNumber';
import Theme from 'app/themes/styles';

const QuestionContent = styled.div`
	padding: 0px 5px;
`;

const QuestionInstruction = styled.p`
	margin-top: 20px;
`;

const WordLimit = styled.strong`
	color: ${Theme.ncpRed};
	font-style: italic;
`;

const QuestionSelect = styled.span`
	margin: 0px 5px;
`;

const Question = styled.div`
	margin-bottom: 20px;
`;

function FillInGap(props) {
	const { questionSection, questionRange, handleOnChange, sectionAnswer } = props;
	const { instruction, questions } = questionSection;

	let valueFormat = [];

	if (sectionAnswer) {
		sectionAnswer.answers.map(answer => {
			valueFormat.push(answer);
		});
	}

	let questionIndex = questionIndexing(questionRange);
	return (
		<QuestionContent>
			<QuestionInstruction>
				Complete the following sentences using <WordLimit>{instruction}</WordLimit> from the text for each gap.
			</QuestionInstruction>

			{questions.map((question, idx) => {
				questionIndex = questionIndex + 1;
				const splitString = splitStringByBlank(question.content);
				const answer = valueFormat.find(answer => answer.id === idx);
				const value = answer ? answer.value : undefined;
				return (
					<Question key={idx}>
						<QuestionNumber>{questionIndex}</QuestionNumber>
						<QuestionSelect>
							{splitString.leftString}
							<CustomInput
								value={value}
								onChange={e => handleOnChange(idx, e.target.value)}
								holderStyle={{
									display: 'inline-block',
									marginTop: '0.5rem',
									marginBottom: '0.5rem',
								}}
								width="150px"
							></CustomInput>
							{splitString.rightString}
						</QuestionSelect>
					</Question>
				);
			})}
		</QuestionContent>
	);
}

export default FillInGap;
