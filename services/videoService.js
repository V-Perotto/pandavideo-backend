const axios = require('axios');
const NodeCache = require('node-cache');
const videoCache = new NodeCache({ stdTTL: 600 });

exports.getVideos = async (filters) => {
  const cacheKey = JSON.stringify(filters);
  const cachedVideos = videoCache.get(cacheKey);

  if (cachedVideos) {
    return cachedVideos;
  }

  const response = await axios.get(
    'https://api.myvideo.com/videos',
    { params: filters }
  );

  videoCache.set(cacheKey, response.data);
  return response.data;
};
