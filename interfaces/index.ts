export type Post = {
  id: number
  slug: string
  title: string
  excerpt: string
  imageUrl: string
  categories: number[]
}

export type Category = {
  id: number
  name: string
}

export type Pagination = {
  page: number
  perPage: number
  total: number
  totalPages: number
}

export type PostResponse = {
  posts?: Post[]
  categories?: Category[]
  pagination?: Pagination,
  statusCode?: number
  message?: string
}
