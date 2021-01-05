import Layout from "app/layouts/Layout"
import { Link, useRouter, useMutation, BlitzPage } from "blitz"
import createMovie from "app/movies/mutations/createMovie"
import MovieForm from "app/movies/components/MovieForm"

const NewMoviePage: BlitzPage = () => {
  const router = useRouter()
  const [createMovieMutation] = useMutation(createMovie)

  return (
    <div>
      <h1>Create New Movie</h1>

      <MovieForm
        initialValues={{}}
        onSubmit={async () => {
          try {
            const movie = await createMovieMutation({ data: { title: "MyName", tmdbId: 1 } })
            alert("Success!" + JSON.stringify(movie))
            router.push(`/movies/${movie.id}`)
          } catch (error) {
            alert("Error creating movie " + JSON.stringify(error, null, 2))
          }
        }}
      />

      <p>
        <Link href="/movies">
          <a>Movies</a>
        </Link>
      </p>
    </div>
  )
}

NewMoviePage.getLayout = (page) => <Layout title={"Create New Movie"}>{page}</Layout>

export default NewMoviePage
