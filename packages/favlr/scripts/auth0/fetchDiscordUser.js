function fetchDiscordUser(accessToken, ctx, cb) {
  const API_URL = "https://discord.com/api/v10";
  const CDN_URL = "https://cdn.discordapp.com";

  request.get(
    {
      url: `${API_URL}/users/@me`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    (err, res, body) => {
      if (err || res.statusCode !== 200) {
        return cb(err || new Error("Failed to fetch user"));
      }

      try {
        const response = JSON.parse(body);

        const { id, username, discriminator, avatar } = response;
        const tag = `${username}#${discriminator}`;
        const picture = `${CDN_URL}/avatars/${id}/${avatar}.png`;

        const profile = {
          id,
          name: tag,
          nickname: username,
          picture,
        };

        cb(null, profile);
      } catch (jsonErr) {
        return cb(jsonErr);
      }
    }
  );
}
