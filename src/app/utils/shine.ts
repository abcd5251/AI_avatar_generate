import { AxiosResponse } from "axios"
import { request } from "./request"

const shineReq = (payload: any) => {
  const baseUrl = 'https://avatardemo.onrender.com'
  return request({
    ...payload,
    baseUrl,
  })
}

const handleMedia = (res: AxiosResponse) => {
  const blob = new Blob([res.data], { type: (res?.headers?.['Content-Type'] as string)?.toLowerCase() });
  return URL.createObjectURL(blob)
}

const handleImage = (response: AxiosResponse) => {
    let image = btoa(
      new Uint8Array(response.data)
        .reduce((data, byte) => data + String.fromCharCode(byte), '')
    );
    // const base64Img = `data:${(response?.headers?.['Content-Type'] as string)?.toLowerCase()};base64,${image}`
    const byteCharacters = atob(image);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: (response?.headers?.['Content-Type'] as string)?.toLowerCase() || 'image/png' });

      // Create a File object from the Blob
      const file = new File([blob], 'uploaded_image.png', { type: (response?.headers?.['Content-Type'] as string)?.toLowerCase() || 'image/png' });

      return file;
  }

export const ShineAPI = {
  avatarWithType: ({type, file}: any) => shineReq({
    data: {file},
    method: "POST",
    endpoint: `generate_avatar_images/?image_type=${type}`,
    contentType: 'multipart/form-data',
    responseType: 'arraybuffer'
  }).then(handleImage),
  avatarWithPrompt: ({prompt, file}: any) => shineReq({
    data: {file},
    method: "POST",
    endpoint: `generate_your_avatar_images/?image_prompt=${prompt}`,
    contentType: 'multipart/form-data',
    responseType: 'arraybuffer'
  }).then(handleImage),
  summarize: ({content, language = "en"}: any) => shineReq({
    data: {content, language},
    method: "POST",
    endpoint: `Summarization`,
  }),
  uploadAvatar: ({username, file}: any) => shineReq({
    data: {file},
    method: "POST",
    endpoint: `upload_avatar?username=${username}`,
    contentType: 'multipart/form-data'
  }),
  uploadAudio: ({username, file}: any) => shineReq({
    data: {file},
    method: "POST",
    endpoint: `upload-audio?username=${username}`,
    contentType: 'multipart/form-data'
  }),
  generateAudio: ({content, gender = "1"}: any) => shineReq({
    data: {content, gender},
    method: "POST",
    endpoint: `generate_audio`,
    responseType: 'arraybuffer',
  }).then(handleMedia),
  generateAiAvatarVideo: ({username}: any) => shineReq({
    endpoint: `generate_ai_avatar_video?username=${username}`,
  }).then(handleMedia),
}