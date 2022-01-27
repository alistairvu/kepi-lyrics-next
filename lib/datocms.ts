import { GraphQLClient } from 'graphql-request';

type RequestParams = {
  query: any;
  variables?: any;
  preview?: boolean;
};

const request = ({ query, variables, preview }: RequestParams) => {
  const endpoint = preview
    ? `https://graphql.datocms.com/preview`
    : `https://graphql.datocms.com/`;
  const client = new GraphQLClient(endpoint, {
    headers: {
      authorization: `Bearer ${process.env.NEXT_DATOCMS_API_TOKEN}`,
    },
  });

  return client.request(query, variables);
};

export default request;
