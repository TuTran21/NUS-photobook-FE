import React from 'react';
import styled from 'styled-components';
import { questionIndexing, splitStringByBlank, incrementAlphabet } from 'utils/utils';
import CustomInput from '../../Form/EngageInput/index';
import QuestionNumber from '../QuestionNumber';
import CustomCheckbox from '../../Form/EngageCheckbox';

const QuestionContent = styled.div`
	padding: 0px 5px;
`;

const QuestionInstruction = styled.p`
	margin-top: 20px;
`;

const WordLimit = styled.strong`
	color: #ff0000;
	font-style: italic;
`;

const QuestionSelect = styled.span`
	margin: 0px 5px;
`;

const Question = styled.div`
	display: flex;
	align-items: center;
	margin-bottom: 15px;
	margin-left: 15px;
`;

function ListSelection(props) {
	const { questionSection, questionRange, handleOnChange, sectionAnswer } = props;
	const { instruction, questions } = questionSection;

	let valueFormat = [];

	if (sectionAnswer) {
		sectionAnswer.answers.map(answer => {
			valueFormat.push({ id: answer.id, value: answer.value });
		});
	}

	let questionIndex = questionIndexing(questionRange);
	return (
		<QuestionContent>
			<QuestionInstruction>{instruction}</QuestionInstruction>

			{questions.map((question, idx) => {
				questionIndex = questionIndex + 1;
				const answer = valueFormat.find(answer => answer.id === idx);
				const value = answer ? (answer.value === 'true' ? true : false) : false;
				const alphabetIndex = incrementAlphabet(idx);
				return (
					<Question key={idx}>
						<QuestionNumber hasAlphabet>{alphabetIndex}</QuestionNumber>
						<QuestionSelect>
							<CustomCheckbox
								isChecked={value}
								title={question.content}
								onChange={e => handleOnChange(idx, e)}
							></CustomCheckbox>
						</QuestionSelect>
					</Question>
				);
			})}
		</QuestionContent>
	);
}

export default ListSelection;
