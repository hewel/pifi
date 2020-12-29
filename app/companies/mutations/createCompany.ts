import { Ctx } from "blitz"
import db, { Prisma } from "db"

type CreateCompanyInput = Pick<Prisma.CompanyCreateArgs, "data">
export default async function createCompany({ data }: CreateCompanyInput, ctx: Ctx) {
  ctx.session.authorize()

  const company = await db.company.create({ data })

  return company
}
