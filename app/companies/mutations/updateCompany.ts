import { Ctx } from "blitz"
import db, { Prisma } from "db"

type UpdateCompanyInput = Pick<Prisma.CompanyUpdateArgs, "where" | "data">

export default async function updateCompany({ where, data }: UpdateCompanyInput, ctx: Ctx) {
  ctx.session.authorize()

  const company = await db.company.update({ where, data })

  return company
}
