import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, usePaginatedQuery, useRouter, BlitzPage } from "blitz"
import getMovies from "app/movies/queries/getMovies"

const ITEMS_PER_PAGE = 100

export const MoviesList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ movies, hasMore }] = usePaginatedQuery(getMovies, {
    orderBy: { id: "asc" },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () => router.push({ query: { page: page - 1 } })
  const goToNextPage = () => router.push({ query: { page: page + 1 } })

  return (
    <div>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link href={`/movies/${movie.id}`}>
              <a>{movie.name}</a>
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

const MoviesPage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/movies/new">
          <a>Create Movie</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <MoviesList />
      </Suspense>
    </div>
  )
}

MoviesPage.getLayout = (page) => <Layout title={"Movies"}>{page}</Layout>

export default MoviesPage