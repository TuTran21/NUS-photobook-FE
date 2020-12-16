import React from 'react';
import styled from 'styled-components';
import CustomRadioButton from '../../Form/EngageRadioButtons/index';
import QuestionNumber from '../QuestionNumber';
import { incrementAlphabet, questionIndexing } from 'utils/utils';

const QuestionContent = styled.div`
	padding: 0px 5px;
`;

const QuestionInstruction = styled.p`
	margin-top: 20px;
`;

const QuestionSelect = styled.span`
	margin: 0px 5px;
`;

const Question = styled.div``;

function MultipleChoice(props) {
	const { questionSection, paragraphAmount, questionRange, handleOnChange, sectionAnswer } = props;
	const { instruction, questionType, questions } = questionSection;

	let questionIndex = questionIndexing(questionRange);

	let valueFormat = [];

	if (sectionAnswer) {
		sectionAnswer.answers.map(answer => {
			valueFormat.push({ key: answer.id, value: answer.value });
		});
	}
	return (
		<React.Fragment>
			<QuestionContent>
				<QuestionInstruction>{instruction}</QuestionInstruction>

				{questions.map((question, idx) => {
					questionIndex = questionIndex + 1;
					const { multipleChoices } = question;

					if (!multipleChoices) {
						return <div>Something went wrong, please try again later</div>;
					}
					let optionFormat = [];
					multipleChoices.map((option, idx) => optionFormat.push({ key: idx, label: option }));
					const value = valueFormat.find(answer => answer.id === idx);
					return (
						<Question key={idx}>
							<QuestionNumber>{questionIndex}</QuestionNumber>
							<QuestionSelect>
								{question.content}
								<CustomRadioButton
									value={value}
									hasAlphabetLabel
									flexvertical
									onChange={e => handleOnChange(idx, e ? e.label : '')}
									holderStyle={{
										marginTop: '15px',
										marginLeft: '15px',
									}}
									options={optionFormat}
								></CustomRadioButton>
							</QuestionSelect>
						</Question>
					);
				})}
			</QuestionContent>
		</React.Fragment>
	);
}

export default MultipleChoice;
