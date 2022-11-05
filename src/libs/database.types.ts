export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      likes: {
        Row: {
          created_at: string | null
          userId: string
          photoId: number
          id: number
        }
        Insert: {
          created_at?: string | null
          userId: string
          photoId: number
          id?: number
        }
        Update: {
          created_at?: string | null
          userId?: string
          photoId?: number
          id?: number
        }
      }
      photos: {
        Row: {
          id: number
          created_at: string | null
          updated_at: string | null
          userId: string
          url: string
          title: string | null
        }
        Insert: {
          id?: number
          created_at?: string | null
          updated_at?: string | null
          userId: string
          url: string
          title?: string | null
        }
        Update: {
          id?: number
          created_at?: string | null
          updated_at?: string | null
          userId?: string
          url?: string
          title?: string | null
        }
      }
      profiles: {
        Row: {
          id: string
          updated_at: string | null
          username: string | null
          avatar_url: string | null
        }
        Insert: {
          id: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
        }
        Update: {
          id?: string
          updated_at?: string | null
          username?: string | null
          avatar_url?: string | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
