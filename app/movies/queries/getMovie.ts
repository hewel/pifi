import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetMovieInput = Pick<Prisma.FindFirstMovieArgs, "where">

export default async function getMovie({ where }: GetMovieInput, ctx: Ctx) {
  ctx.session.authorize()

  const movie = await db.movie.findFirst({ where })

  if (!movie) throw new NotFoundError()

  return movie
}
