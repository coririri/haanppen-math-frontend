const backendUrl = process.env.REACT_APP_BACKEND_URL;

const imageUrlToSrc = (imageUrl) => `${backendUrl}api/media/${imageUrl}`;

export default imageUrlToSrc;
