import { SiteClient } from 'datocms-client';

export default function handler({ query: { id } }, response) {
  const client = new SiteClient(process.env.API_TOKEN);

  console.log(request.query);

  const records = await client.items.all({
    filter: {
      fields: {
        owner: {
          eq: id,
        },
      },
    },
  });

  response.json({
    records: records
  });

  return;
}