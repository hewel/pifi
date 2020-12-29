import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useParam, BlitzPage, useMutation } from "blitz"
import getMovie from "app/movies/queries/getMovie"
import deleteMovie from "app/movies/mutations/deleteMovie"

export const Movie = () => {
  const router = useRouter()
  const movieId = useParam("movieId", "number")
  const [movie] = useQuery(getMovie, { where: { id: movieId } })
  const [deleteMovieMutation] = useMutation(deleteMovie)

  return (
    <div>
      <h1>Movie {movie.id}</h1>
      <pre>{JSON.stringify(movie, null, 2)}</pre>

      <Link href={`/movies/${movie.id}/edit`}>
        <a>Edit</a>
      </Link>

      <button
        type="button"
        onClick={async () => {
          if (window.confirm("This will be deleted")) {
            await deleteMovieMutation({ where: { id: movie.id } })
            router.push("/movies")
          }
        }}
      >
        Delete
      </button>
    </div>
  )
}

const ShowMoviePage: BlitzPage = () => {
  return (
    <div>
      <p>
        <Link href="/movies">
          <a>Movies</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Movie />
      </Suspense>
    </div>
  )
}

ShowMoviePage.getLayout = (page) => <Layout title={"Movie"}>{page}</Layout>

export default ShowMoviePage
