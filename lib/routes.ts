// Type-safe route helpers
export const routes = {
  home: '/',
  login: '/login',
  welcome: '/welcome',
  module: (slug: string) => `/modul/${slug}`,
  lesson: (moduleSlug: string, lessonSlug: string) => `/lekcija/${moduleSlug}/${lessonSlug}`,
} as const

export type RouteParams = {
  module: { slug: string }
  lesson: { module: string; lesson: string }
}
