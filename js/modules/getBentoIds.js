export const getBentoAlbumIds = async (data) => {
  let albumIds = "";

  for await (const item of data.albums.items) {
    // console.log(item);
    const [origin, endpoint, id] = item.data.uri.split(":");
    albumIds+= `${id},`;
  }

  return albumIds;
};
