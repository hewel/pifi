import { Ctx } from "blitz"
import db, { Prisma } from "db"

type DeleteCompanyInput = Pick<Prisma.CompanyDeleteArgs, "where">

export default async function deleteCompany({ where }: DeleteCompanyInput, ctx: Ctx) {
  ctx.session.authorize()

  const company = await db.company.delete({ where })

  return company
}
