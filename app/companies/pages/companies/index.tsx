import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getCompanies from "app/companies/queries/getCompanies"

const ITEMS_PER_PAGE = 100

export const CompaniesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ companies, hasMore }] = usePaginatedQuery(getCompanies, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {companies.map((company) => (
          <li key={company.id}>
            <Link href={`/companies/${company.id}`}>
              <a>{company.name}</a>
            </Link>
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const CompaniesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/companies/new">
          <a>Create Company</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <CompaniesList />
      </Suspense>
    </div>
  )
}

CompaniesPage.getLayout = (page) => <Layout title={"Companies"}>{page}</Layout>

export default CompaniesPage
