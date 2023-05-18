import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Input, Rate, Alert } from "antd";
import { Rule } from "antd/lib/form";

interface Question {
  questionId: string;
  label: string;
  required: boolean;
  questionType: "range" | string;
}

interface FormData {
  [key: string]: string;
}

interface FormCustomProps {
  data: {
    id: string;
    attributes: {
      questions: Question[];
    };
  };
}

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const FormCustom: React.FC<FormCustomProps> = ({ data }) => {
  let navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = () => {
    setError(null);
  };

  const onFailHandler = () => {
    // setError(true);
  };

  const onFinish = async (values: FormData) => {
    try {
      const response = await axios.post(
        `/api/v1/survey/${data.id}/answers`,
        values
      );
      navigate("/success", { state: { submittedData: response.data } });
    } catch (error) {
      setError("Failed to submit the form, please try again later.");
    }
  };

  return (
    <>
      <Form
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFailHandler}
        onChange={onChangeHandler}
        autoComplete="off"
      >
        {data.attributes.questions.map((question: Question) => (
          <Form.Item
            key={question.questionId}
            label={question.label}
            name={question.questionId}
            rules={[
              {
                required: question.required,
                message: "This field is required!",
              } as Rule,
            ]}
          >
            {question.questionType === "range" ? (
              <Rate tooltips={desc} />
            ) : (
              <Input />
            )}
          </Form.Item>
        ))}

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {error && <Alert message={error} type="error" />}
    </>
  );
};

export default FormCustom;
