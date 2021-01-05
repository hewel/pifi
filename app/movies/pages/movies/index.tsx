import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { usePaginatedQuery, useRouter, BlitzPage, Link } from "blitz"
import { Link as MuiLink, Typography } from "@material-ui/core"
import Poster from "app/movies/components/Poster"
import getMovies from "app/movies/queries/getMovies"

const ITEMS_PER_PAGE = 20
const TITLE = "Movies"

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
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
        {movies.map((movie) => {
          const movieReleaseYear = movie.releaseDate?.getFullYear()
          const href = `/movies/${movie.id}`

          return (
            <figure key={movie.id} className="flex flex-col">
              <Link href={href}>
                <Poster
                  src={`https://image.tmdb.org/t/p/w780${movie.poster}`}
                  title={movie.title + ` (${movieReleaseYear})`}
                />
              </Link>
              <figcaption className="flex-1 mt-2">
                <Typography
                  className="flex flex-col justify-between h-full"
                  color="primary"
                  variant="subtitle2"
                >
                  <Link href={href}>
                    <MuiLink
                      className="mb-1 truncate cursor-pointer"
                      underline="none"
                      title={movie.title + ` (${movieReleaseYear})`}
                    >
                      {movie.title}
                    </MuiLink>
                  </Link>
                  <span className="text-gray-500">{movieReleaseYear}</span>
                </Typography>
              </figcaption>
            </figure>
          )
        })}
      </div>

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
      <Suspense fallback={<div>Loading...</div>}>
        <MoviesList />
      </Suspense>
    </div>
  )
}

MoviesPage.getLayout = (page) => <Layout title={TITLE}>{page}</Layout>

export default MoviesPage
