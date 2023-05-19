import React from 'react';
import { useLocation } from 'react-router-dom';
import { Collapse, Rate, Alert } from 'antd';
const { Panel } = Collapse;

interface Question {
  label: string;
  questionId: string;
  questionType: string;
}

interface Answer {
  answer: string;
}

interface SubmittedData {
  relationships: {
    survey: {
      attributes: {
        questions: Question[];
      };
    };
  };
  attributes: {
    answers: Answer[];
  };
}

const SuccessPage: React.FC = () => {
  const location = useLocation();
  const submittedData: SubmittedData | undefined =
    location.state?.submittedData?.data;

  return (
    <div className="content">
      {submittedData ? (
        <>
          <h1>Thank you for your submission!</h1>
          <Collapse defaultActiveKey={['film', 'review']}>
            {submittedData.relationships.survey.attributes.questions.map(
              (item: Question, index: number) => (
                <Panel header={item.label} key={item.questionId}>
                  {item.questionType === 'range' ? (
                    <Rate
                      disabled
                      defaultValue={Number(
                        submittedData.attributes.answers[index].answer
                      )}
                    />
                  ) : (
                    <p>{submittedData.attributes.answers[index].answer}</p>
                  )}
                </Panel>
              )
            )}
          </Collapse>
        </>
      ) : (
        <Alert message="No answers" type="error" />
      )}
    </div>
  );
};

export default SuccessPage;
