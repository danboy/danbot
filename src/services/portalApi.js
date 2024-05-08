utils.getOpenStores = async ({ accessToken }) => {
  if (!accessToken) return "no access token provided";
  try {
    return await axios.get(`${process.env.API_URL}/admin/stores?version=4&limit=9999&stages=STORE_CLOSURE&stages=LIVE`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      retry: 3,
      retryDelay: 1000,
    });
  } catch (error) {
    console.error('fetchStoreDetails FAILED. Error:', error.message);
    return [];
  }
};
