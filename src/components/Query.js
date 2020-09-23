import React from 'react';
import { useForm } from 'react-hook-form';
import { useLazyQuery, useQuery, useApolloClient } from '@apollo/client';
import gql from 'graphql-tag';

const GET_REQUESTS = gql`
  query requests($first: Int, $filter: RequestsFilterInput) {
    requests(first: $first, filter: $filter) {
      totalCount
      edges {
        node {
          id
          type
          status
        }
      }
    }
  }
`;

const Query = () => {
  const { handleSubmit, register } = useForm();
  const [getQuery, { called, loading, data }] = useLazyQuery();
  const client = useApolloClient();

  if (called && loading) return <p>Loading ...</p>;

  const onSubmit = async (data) => {
    // query site dev here
    // await getQuery({
    //   context: {
    //     query: GET_REQUESTS,
    //   },
    //   variables: data.variables,
    // });

    console.log(JSON.parse(data.variables));
    const result = await client.query({
      query: gql`
        ${data.query}
      `,
      variables: JSON.parse(data.variables),
    });
    console.log('result here', result);
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
      {data && <code>{data.requests.totalCount}</code>}
    </div>
  );
};

export default Query;
