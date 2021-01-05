import db from "./index"
import got from "got"
import { keys, pipe, map, split, trim } from "rambda"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * or https://github.com/Marak/Faker.js to easily generate
 * realistic data.
 */

const get = got.extend({
  method: "GET",
  prefixUrl: "https://api.themoviedb.org",
  responseType: "json",
  searchParams: { language: "zh-CN" },
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMjllMWYwNjZjNWViZjkwMWUyMWFjMTI2MjU3YjE5ZiIsInN1YiI6IjVmZTliNWQxYzlkYmY5MDAzYzRhOTllOSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.qPyvfWaXgJGrxJi9R32k5sRKi2Xoavu2hNWN7HhZrLo",
  },
})
const getList = async (page: number = 1) => {
  const { body } = await get<any>("4/list/128658", {
    searchParams: { page },
  })
  const splitByColon = split(":")
  const idList = pipe(
    keys,
    map((key) => Number(splitByColon(key)[1]))
  )(body?.object_ids)
  return idList
}
const getMovie = async (id: number) => {
  const { body } = await get<any>(`3/movie/${id}`)
  return body
}
const seed = async () => {
  const movieIdList = await getList()
  console.log("movieIdList:", movieIdList)
  movieIdList.forEach(async (id) => {
    const movieDetails = await getMovie(id)
    await db.movie.update({
      data: {
        title: trim(movieDetails?.title),
        overview: trim(movieDetails?.overview),
        homepage: movieDetails?.homepage,
        tmdbId: movieDetails?.id,
        imdbId: movieDetails?.imdb_id,
        language: movieDetails?.original_language,
        popularity: movieDetails?.popularity,
        releaseDate: new Date(movieDetails?.release_date),
        budget: movieDetails?.budget,
        revenue: movieDetails?.revenue,
        runtime: movieDetails?.runtime,
        tagline: trim(movieDetails?.tagline),
        backdrop: movieDetails?.backdrop_path,
        poster: movieDetails?.poster_path,
        // companies: {
        //   create: movieDetails?.production_companies?.map(({ id, name, origin_country }) => ({
        //     name,
        //     tmdbId: id,
        //     region: origin_country || null,
        //   })),
        // },
        countries: movieDetails?.production_countries.map(({ iso_3166_1 }) => iso_3166_1),
      },
      where: {
        tmdbId: id,
      },
    })
  })
}

export default seed
