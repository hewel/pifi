import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getCompany from "app/companies/queries/getCompany"
import updateCompany from "app/companies/mutations/updateCompany"
import CompanyForm from "app/companies/components/CompanyForm"

export const EditCompany = () => {
  const router = useRouter()
  const companyId = useParam("companyId", "number")
  const [company, { setQueryData }] = useQuery(getCompany, { where: { id: companyId } })
  const [updateCompanyMutation] = useMutation(updateCompany)

  return (
    <div>
      <h1>Edit Company {company.id}</h1>
      <pre>{JSON.stringify(company)}</pre>

      <CompanyForm
        initialValues={company}
        onSubmit={async () => {
          try {
            const updated = await updateCompanyMutation({
              where: { id: company.id },
              data: { name: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/companies/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing company " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditCompanyPage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditCompany />
      </Suspense>

      <p>
        <Link href="/companies">
          <a>Companies</a>
        </Link>
      </p>
    </div>
  )
}

EditCompanyPage.getLayout = (page) => <Layout title={"Edit Company"}>{page}</Layout>

export default EditCompanyPage
