import React from 'react';
import useFetch from '../../hooks/useFetch';
import './SurveyForm.scss';

import FormCustom from '../../components/FormCustom/FormCustom';
import Loading from '../../components/Loading/Loading';
import { Alert } from 'antd';

const SurveyForm: React.FC = () => {
  const {
    data,
    error,
    isLoading,
  }: { data: any; error: any; isLoading: boolean } = useFetch('/api/v1/survey');

  return isLoading ? (
    <Loading />
  ) : (
    <div className="filmForm">
      {error ? (
        <Alert
          message="Error"
          description={error.message}
          type="error"
          showIcon
        />
      ) : (
        <>
          <h1>{data.attributes.title}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: data.attributes.description,
            }}
          />
          <FormCustom data={data} />
        </>
      )}
    </div>
  );
};

export default SurveyForm;
