import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useQuery, useParam, BlitzPage, Head } from "blitz"
import getMovie from "app/movies/queries/getMovie"
import Nav from "app/components/Nav"

export const Movie = () => {
  const movieId = useParam("movieId", "number")
  const [movie] = useQuery(getMovie, { where: { id: movieId } })

  return (
    <div>
      <Head>
        <title>{movie.title}</title>
      </Head>
      <h1>Movie {movie.id}</h1>
      <pre>{JSON.stringify(movie, null, 2)}</pre>

      <Link href={`/movies/${movie.id}/edit`}>
        <a>Edit</a>
      </Link>
    </div>
  )
}

const ShowMoviePage: BlitzPage = () => {
  return (
    <div>
      <Nav />
      <Suspense fallback={<div>Loading...</div>}>
        <Movie />
      </Suspense>
    </div>
  )
}

ShowMoviePage.getLayout = (page) => <Layout title={"Movie"}>{page}</Layout>

export default ShowMoviePage
