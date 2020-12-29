import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetMoviesInput = Pick<Prisma.FindManyMovieArgs, "where" | "orderBy" | "skip" | "take">

export default async function getMovies(
  { where, orderBy, skip = 0, take }: GetMoviesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const movies = await db.movie.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.movie.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    movies,
    nextPage,
    hasMore,
    count,
  }
}
