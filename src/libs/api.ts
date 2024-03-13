import axiosInstance from "../utils/axios"

export const recommendedManga = async () => {
  try {
    const response = await axiosInstance.get('/comic/recommended/page/1')
    return response.data.data
  } catch (error) {
    return error 
  }
}

export const popularManga = async () => {
  try {
    const response = await axiosInstance.get('/comic/popular/page/1')
    return response.data.data
  } catch (error) {
    return error 
  }
}

export const manhwaList = async () => {
  try {
    const response = await axiosInstance.get('/comic/list?filter=manhwa')
    return response.data.data
  } catch (error) {
    return error 
  }
}

export const detailComic = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/comic/info/manga/${slug}`)
    return response.data
  } catch (error) {
    return error
  }
}

export const chapterList = async (slug: string) => {
  try {
    const response = await axiosInstance.get(`/comic/chapter/ch/${slug}`)
    return response.data
  } catch (error) {
    return error
  }
}

export const searchComic = async (keyword: string) => {
  try {
    const response = await axiosInstance.get(`/comic/search/${keyword}`)
    return response.data
  } catch (error) {
    return error
  }
}