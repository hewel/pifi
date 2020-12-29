import { Ctx } from "blitz"
import db, { Prisma } from "db"

type GetCompaniesInput = Pick<Prisma.FindManyCompanyArgs, "where" | "orderBy" | "skip" | "take">

export default async function getCompanies(
  { where, orderBy, skip = 0, take }: GetCompaniesInput,
  ctx: Ctx
) {
  ctx.session.authorize()

  const companies = await db.company.findMany({
    where,
    orderBy,
    take,
    skip,
  })

  const count = await db.company.count()
  const hasMore = typeof take === "number" ? skip + take < count : false
  const nextPage = hasMore ? { take, skip: skip + take! } : null

  return {
    companies,
    nextPage,
    hasMore,
    count,
  }
}
