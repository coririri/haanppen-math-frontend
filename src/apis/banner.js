import instance from './instance';

const getBanners = () => instance.get('/api/banners');

export const postBanner = (data) =>
  instance.post('/api/banners', {
    content: data,
  });

export const deleteBanner = (deleteId) =>
  instance.delete(`/api/banners/${deleteId}`);

export const putBanner = (putId, content) =>
  instance.put('/api/banners', {
    bannerId: putId,
    content,
  });

export default getBanners;
