import { SiteClient } from 'datocms-client';

export default async function ResquestReceiver(request, response){

  if(request.method === 'POST') {
    const client = new SiteClient(process.env.FULL_TOKEN);

    const { title, image, link, owner } = request.body;

    const community = await client.items.create({
      itemType: process.env.MODEL_ID,
      title,
      image,
      link,
      owner,
    });
  
    response.json({
      community: community
    });

    return;
  }

  if(request.method === 'GET'){
    const client = new SiteClient(process.env.API_TOKEN);

    const { user } = request.query;
    console.log(user)

    const records = await client.items.all({
      filter: {
        type: "community",
        fields: {
          owner: {
            eq: user,
          },
        },
      },
    });
  
    response.json({
      records: records
    });

    return;
  }
  
}