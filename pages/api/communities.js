import { SiteClient } from 'datocms-client';

export default async function ResquestReceiver(request, response){

  if(request.method === 'POST') {
    const TOKEN = '9505f85d4fba90c077ccb2be87af2c'
    const client = new SiteClient(TOKEN);

    const { title, image, link, owner } = request.body;

    const community = await client.items.create({
      itemType: '976198',
      title,
      image,
      link,
      owner,
    });
  
    response.json({
      community: community
    })

    return;
  }

  response.status(404).json({
    message: 'o GET não ta pronto!!!'
  })
  
}