import { Ctx, NotFoundError } from "blitz"
import db, { Prisma } from "db"

type GetCompanyInput = Pick<Prisma.FindFirstCompanyArgs, "where">

export default async function getCompany({ where }: GetCompanyInput, ctx: Ctx) {
  ctx.session.authorize()

  const company = await db.company.findFirst({ where })

  if (!company) throw new NotFoundError()

  return company
}
