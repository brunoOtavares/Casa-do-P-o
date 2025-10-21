const IMGBB_API_KEY = '507658e73f2d7f0c9c01222be7ff658c';

export const uploadImageToImgBB = async (imageFile) => {
  try {
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('key', IMGBB_API_KEY);

    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      return {
        success: true,
        url: data.data.url,
        displayUrl: data.data.display_url,
        deleteUrl: data.data.delete_url,
      };
    } else {
      throw new Error(data.error?.message || 'Erro ao fazer upload da imagem');
    }
  } catch (error) {
    console.error('Erro no upload:', error);
    return {
      success: false,
      error: error.message || 'Erro ao fazer upload da imagem',
    };
  }
};
