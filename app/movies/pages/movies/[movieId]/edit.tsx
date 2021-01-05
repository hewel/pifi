import { Suspense } from "react"
import Layout from "app/layouts/Layout"
import { Link, useRouter, useQuery, useMutation, useParam, BlitzPage } from "blitz"
import getMovie from "app/movies/queries/getMovie"
import updateMovie from "app/movies/mutations/updateMovie"
import MovieForm from "app/movies/components/MovieForm"

export const EditMovie = () => {
  const router = useRouter()
  const movieId = useParam("movieId", "number")
  const [movie, { setQueryData }] = useQuery(getMovie, { where: { id: movieId } })
  const [updateMovieMutation] = useMutation(updateMovie)

  return (
    <div>
      <h1>Edit Movie {movie.id}</h1>
      <pre>{JSON.stringify(movie)}</pre>

      <MovieForm
        initialValues={movie}
        onSubmit={async () => {
          try {
            const updated = await updateMovieMutation({
              where: { id: movie.id },
              data: { title: "MyNewName" },
            })
            await setQueryData(updated)
            alert("Success!" + JSON.stringify(updated))
            router.push(`/movies/${updated.id}`)
          } catch (error) {
            console.log(error)
            alert("Error editing movie " + JSON.stringify(error, null, 2))
          }
        }}
      />
    </div>
  )
}

const EditMoviePage: BlitzPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditMovie />
      </Suspense>

      <p>
        <Link href="/movies">
          <a>Movies</a>
        </Link>
      </p>
    </div>
  )
}

EditMoviePage.getLayout = (page) => <Layout title={"Edit Movie"}>{page}</Layout>

export default EditMoviePage
