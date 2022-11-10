import { LikeType } from "./like.type"

export type PhotoType = {
  id: number
  userId: string
  url: string
  created_at: string | null
  updated_at: string | null
  title: string | null
}

export type PhotoCardType = (PhotoType & {likes: LikeType | LikeType[] | null} & {author: {username: unknown} | {username: unknown}[] | null})
