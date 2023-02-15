import { getAccessToken, withApiAuthRequired } from "@auth0/nextjs-auth0";

const PROXY_SERVER_URL = process.env.NEXT_PUBLIC_PROXY_SERVER_URL;

export default withApiAuthRequired(async function handler(req, res) {
  const { imageId } = req.query;
  const { accessToken } = await getAccessToken(req, res);

  const imageResponse = await fetch(`${PROXY_SERVER_URL}/images/${imageId}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const imageArrayBuffer = await imageResponse.arrayBuffer();
  const imageBuffer = Buffer.from(imageArrayBuffer);

  res.setHeader("Content-Type", "image/jpeg");
  res.send(imageBuffer);
});
