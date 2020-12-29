import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateMovieInput = Pick<Prisma.MovieCreateArgs, "data">
export default async function createMovie({ data }: CreateMovieInput, ctx: Ctx) {
  ctx.session.authorize()

  const movie = await db.movie.create({ data })

  return movie
}
