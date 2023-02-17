import { withApiAuthRequired, getSession } from "@auth0/nextjs-auth0";

import { getAuth } from "firebase-admin/auth";
import jwt from "jsonwebtoken";

import "../../firebase/admin";

const mapPermissionsToClaims = (permissions) => {
  const genres = [
    permissions.includes("read:horror:movies") && "Horror",
    permissions.includes("read:thriller:movies") && "Thriller",
  ];

  return {
	genres: genres.filter(Boolean)
  }
};

export default withApiAuthRequired(async function handler(req, res) {
  const session = await getSession(req, res);
  const userId = session.user.sub;

  const { permissions } = jwt.decode(session.accessToken);
  const claims = mapPermissionsToClaims(permissions);

  const customToken = await getAuth().createCustomToken(userId, claims);

  res.status(200).json({
    firebaseToken: customToken,
    userClaims: claims,
  });
});
