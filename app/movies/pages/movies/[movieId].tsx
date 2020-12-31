import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import MuiLayout from "app/layouts/MuiLayout"
import { Link, useQuery, useParam, BlitzPage } from "blitz"
import getMovie from "app/movies/queries/getMovie"

export const Movie = () => {
  const movieId = useParam("movieId", "number")
  const [movie] = useQuery(getMovie, { where: { id: movieId } })

  return (
    <MuiLayout title={`movie-${movieId}`}>
      <h1>Movie {movie.id}</h1>
      <pre>{JSON.stringify(movie, null, 2)}</pre>

      <Link href={`/movies/${movie.id}/edit`}>
        <a>Edit</a>
      </Link>
    </MuiLayout>
  )
}

const ShowMoviePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Movie />
      </Suspense>
    </div>
  )
}

ShowMoviePage.getLayout = (page) => <Layout title={"Movie"}>{page}</Layout>

export default ShowMoviePage
