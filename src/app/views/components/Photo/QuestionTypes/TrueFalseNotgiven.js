import React from 'react';
import styled from 'styled-components';
import { isEven, questionIndexing } from 'utils/utils';
import CustomDropdown from '../../Form/EngageDropdown/index';
import QuestionNumber from '../QuestionNumber';

const QuestionContent = styled.div`
	padding: 0px 5px;
`;

const QuestionInstruction = styled.div`
	margin-top: 20px;
`;

const QuestionSelect = styled.span`
	margin: 0px 5px;
`;

const Question = styled.div`
	margin-bottom: 20px;
`;

const InstructionLine = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px 10px;
	background-color: ${props => (props.isGrey ? '#f5f5f5;' : 'none;')};
`;

const InstructionLabel = styled.label`
	font-size: 14px;
	font-weight: 600;
	margin-bottom: 0px;
	padding: 5px 0px;
`;

const InstructionWrapper = styled.div`
	margin-bottom: 14px;
`;

const instructionText = [
	{
		value: 'TRUE',
		label: 'If the statement agrees with the information',
	},
	{
		value: 'FALSE',
		label: 'If the statement contradicts the information',
	},
	{ value: 'NOT GIVEN', label: 'If there is no information on this' },
];

function InstructionTable(props) {
	const { options } = props;

	return options.map((option, idx) => {
		return instructionText.map(instruction => {
			if (instruction.value.toUpperCase() === option.toUpperCase()) {
				return (
					<InstructionLine key={idx} isGrey={isEven(idx)}>
						<InstructionLabel>{instruction.value}</InstructionLabel>
						<InstructionLabel>{instruction.label}</InstructionLabel>
					</InstructionLine>
				);
			}
			return null;
		});
	});
}

function TrueFalseNotgiven(props) {
	const { questionSection, paragraphAmount, questionRange, handleOnChange, sectionAnswer } = props;

	const { instruction, questionType, options, questions } = questionSection;
	let questionIndex = questionIndexing(questionRange);
	let optionFormat = [];
	let valueFormat = [];

	if (!options) {
		return <div>Something went wrong, please try again later</div>;
	}

	if (sectionAnswer) {
		sectionAnswer.answers.map(answer => {
			valueFormat.push(answer);
		});
	}

	options.map(option => optionFormat.push({ value: option, label: option }));
	return (
		<QuestionContent>
			<QuestionInstruction>
				<p>Do the following statements agree with the information given in the Reading Passage</p>
				<p>
					In boxes <strong>{questionRange}</strong> on your answer sheet, choose
				</p>
				<InstructionWrapper>
					<InstructionTable options={options}></InstructionTable>
				</InstructionWrapper>
			</QuestionInstruction>

			{questions.map((question, idx) => {
				const answer = valueFormat.find(answer => answer.id === idx);
				const value = answer ? { value: answer.value, label: answer.value } : '';
				questionIndex = questionIndex + 1;
				return (
					<Question key={idx}>
						<QuestionNumber>{questionIndex}</QuestionNumber>
						<QuestionSelect>
							<CustomDropdown
								value={value}
								onChange={e => handleOnChange(idx, e.value)}
								holderStyle={{
									marginTop: '0.5rem',
									marginBottom: '0.5rem',
								}}
								options={optionFormat}
							></CustomDropdown>
						</QuestionSelect>
						{question.content}
					</Question>
				);
			})}
		</QuestionContent>
	);
}

export default TrueFalseNotgiven;
