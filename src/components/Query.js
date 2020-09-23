import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import gql from 'graphql-tag';
import { useApolloClient } from '@apollo/client';

const Query = () => {
  const { handleSubmit, register } = useForm();
  const [response, setResponse] = useState('');
  const client = useApolloClient();

  const onSubmit = async (data) => {
    const result = await client.query({
      query: gql`
        ${data.query}
      `,
      variables: JSON.parse(data.variables),
    });
    console.log('result here', result);
    setResponse(JSON.stringify(result, undefined, 1));
  };
  return (
    <div>
      Query
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea name="query" ref={register}></textarea>
        <textarea name="variables" ref={register}></textarea>
        <br />
        <input type="submit" value="Submit Query" />
      </form>
      {response !== '' && <pre>{response}</pre>}
    </div>
  );
};

export default Query;
