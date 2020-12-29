import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateMovieInput = Pick<Prisma.MovieUpdateArgs, "where" | "data">

export default async function updateMovie({ where, data }: UpdateMovieInput, ctx: Ctx) {
  ctx.session.authorize()

  const movie = await db.movie.update({ where, data })

  return movie
}
