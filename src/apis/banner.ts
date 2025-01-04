import { BannerType } from '../types/bannerType';
import instance from './instance';

const getBanners = () => instance.get('/api/banners');

export const postBanner = (data: BannerType) =>
  instance.post('/api/banners', {
    content: data,
  });

export const deleteBanner = (deleteId: number) =>
  instance.delete(`/api/banners/${deleteId}`);

export const putBanner = (putId: number, content: BannerType) =>
  instance.put('/api/banners', {
    bannerId: putId,
    content,
  });

export default getBanners;
