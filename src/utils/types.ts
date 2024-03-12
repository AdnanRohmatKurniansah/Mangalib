export interface RecommendedManga {
    title: string
    image: string
    desc: string
    type: string
    endpoint: string
}

export interface PopularManga {
    title: string
    image: string
    desc: string
    type: string
    endpoint: string
}

export interface Manhwa {
    title: string
    image: string
    endpoint: string
}

export interface DetailComic {
    thumbnail: string
    title: string
    type: string
    author: string
    status: string
    rating: string
    genre: string[]
    chapter_list: Chapter[]
}

interface Chapter {
    name: string
    endpoint: string
}

export interface ChapterList {
    title: string
    image: string[]
}