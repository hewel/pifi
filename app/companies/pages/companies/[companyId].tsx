import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getCompany from "app/companies/queries/getCompany"
import deleteCompany from "app/companies/mutations/deleteCompany"

export const Company = () => {
  const router = useRouter()
  const companyId = useParam("companyId", "number")
  const [company] = useQuery(getCompany, { where: { id: companyId } })
  const [deleteCompanyMutation] = useMutation(deleteCompany)

  return (
    <div>
      <h1>Company {company.id}</h1>
      <pre>{JSON.stringify(company, null, 2)}</pre>

      <Link href={`/companies/${company.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteCompanyMutation({ where: { id: company.id } })
            router.push("/companies")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowCompanyPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/companies">
          <a>Companies</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Company />
      </Suspense>
    </div>
  )
}

ShowCompanyPage.getLayout = (page) => <Layout title={"Company"}>{page}</Layout>

export default ShowCompanyPage
