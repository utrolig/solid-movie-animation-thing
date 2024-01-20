import { MovieType } from "./types";
import styles from "./Movies.module.css";
import { For } from "solid-js";
import { Movie } from "./Movie";

const movies: MovieType[] = [
  {
    title: "Dunkirk",
    posterUrl: "/dunkirk.jpg",
    trailerUrl: "/dunkirk.mp4",
    synopsis:
      "Allied soldiers from Belgium, the British Commonwealth and Empire, and France are surrounded by the German Army and evacuated during a fierce battle in World War II.",
  },
  {
    title: "Inception",
    posterUrl: "/inception.jpg",
    trailerUrl: "/inception.mp4",
    synopsis:
      "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
  },
  {
    title: "Interstellar",
    posterUrl: "/interstellar.jpg",
    trailerUrl: "/interstellar.mp4",
    synopsis:
      "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
  },
];

export const Movies = () => {
  return (
    <div class={styles.movies}>
      <For each={movies}>{(movie) => <Movie movie={movie} />}</For>
    </div>
  );
};
