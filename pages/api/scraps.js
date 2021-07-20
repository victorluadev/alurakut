import { SiteClient } from 'datocms-client';

export default async function ResquestReceiver(request, response){

  if(request.method === 'POST') {
    const client = new SiteClient(process.env.FULL_TOKEN);

    const { github_user, message } = request.body;

    const scrap = await client.items.create({
      itemType: process.env.MODEL_ID_SCRAP,
      github_user,
      message,
    });
  
    response.json({
      scrap: scrap
    });

    return;
  }

  if(request.method === 'GET'){
    const client = new SiteClient(process.env.API_TOKEN);

    const records = await client.items.all({
      nested: 'true',
      'filter[type]': 'scrap',
      version: 'published'
    });
  
    response.json({
      records: records
    });

    return;
  }
  
}