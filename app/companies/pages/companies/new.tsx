import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createCompany from "app/companies/mutations/createCompany"
import CompanyForm from "app/companies/components/CompanyForm"

const NewCompanyPage: BlitzPage = () => {
  const router = useRouter()
  const [createCompanyMutation] = useMutation(createCompany)

  return (
    <div>
      <h1>Create New Company</h1>

      <CompanyForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const company = await createCompanyMutation({ data: { name: "MyName" } })
            alert("Success!" + JSON.stringify(company))
            router.push(`/companies/${company.id}`)
          } catch (error) {
            alert("Error creating company " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/companies">
          <a>Companies</a>
        </Link>
      </p>
    </div>
  )
}

NewCompanyPage.getLayout = (page) => <Layout title={"Create New Company"}>{page}</Layout>

export default NewCompanyPage
