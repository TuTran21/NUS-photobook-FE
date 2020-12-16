import React from 'react';
import styled from 'styled-components';
import CustomDropdown from '../../Form/EngageDropdown/index';
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

const Question = styled.div`
	margin-bottom: 20px;
`;

function MatchHeadingQuestion(props) {
	const { questionSection, paragraphAmount, questionRange, handleOnChange, sectionAnswer } = props;
	const { instruction, questionType, options, questions } = questionSection;

	let questionIndex = 0;
	questionIndex = questionIndexing(questionRange);

	let optionFormat = [];
	let valueFormat = [];

	if (sectionAnswer) {
		sectionAnswer.answers.map(answer => {
			valueFormat.push(answer);
		});
	}

	if (!options) {
		return <div>Something went wrong, please try again later</div>;
	}

	options.map(option => optionFormat.push({ value: option, label: option }));
	return (
		<React.Fragment>
			<QuestionContent>
				<QuestionInstruction>
					The text has <strong>{paragraphAmount}</strong> paragraphs{' '}
					<strong>
						({options[0]} - {options.slice(-1).pop()})
					</strong>
				</QuestionInstruction>
				<QuestionInstruction>{instruction}</QuestionInstruction>

				{questions.map((question, idx) => {
					questionIndex = questionIndex + 1;
					const answer = valueFormat.find(answer => answer.id === idx);
					const value = answer ? { value: answer.value, label: answer.value } : '';
					return (
						<Question key={questionIndex}>
							<QuestionNumber>{questionIndex}</QuestionNumber>
							<QuestionSelect>
								<CustomDropdown
									key={questionIndex}
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
							{/* {isCreateForm && (
								<React.Suspense fallback={<LoadingIndicator></LoadingIndicator>}>
									<CreateTestParagraph content={question.content} />
								</React.Suspense>
							)} */}
						</Question>
					);
				})}
			</QuestionContent>
		</React.Fragment>
	);
}

export default MatchHeadingQuestion;
