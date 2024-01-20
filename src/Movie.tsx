import {
  Component,
  Show,
  createEffect,
  createMemo,
  createSignal,
} from "solid-js";
import { MovieType } from "./types";
import styles from "./Movie.module.css";
import clsx from "clsx";
import { Fullview } from "./Fullview";

type MovieProps = {
  movie: MovieType;
};

export const Movie: Component<MovieProps> = (props) => {
  const [isFullview, setIsFullview] = createSignal(false);
  const [isOver, setIsOver] = createSignal(false);
  const [videoRef, setVideoRef] = createSignal<HTMLVideoElement | null>(null);

  const videoPreview = createMemo(() => {
    return isOver() || isFullview();
  });

  createEffect(() => {
    const isPreviewing = videoPreview();
    const ref = videoRef();

    if (isPreviewing && ref) {
      ref.currentTime = 0;
      ref.play();
    } else if (!isPreviewing && ref) {
      ref.pause();
    }
  });

  return (
    <div
      class={clsx(styles.movie, {
        [styles.videoPreview]: videoPreview(),
      })}
      onClick={() => setIsFullview(true)}
      onMouseEnter={() => setIsOver(true)}
      onMouseLeave={() => setIsOver(false)}
    >
      <img
        class={clsx(styles.poster, videoPreview() && styles.posterOver)}
        src={props.movie.posterUrl}
      />
      <video
        // @ts-ignore
        disablePictureInPicture="true"
        ref={setVideoRef}
        src={props.movie.trailerUrl}
        class={clsx(
          styles.video,
          isOver() && styles.videoOver,
          isFullview() && styles.videoFullview
        )}
        loop
        muted
      />
      <Show when={isFullview()}>
        <Fullview
          onClose={() => {
            setIsFullview(false);
            setTimeout(() => {
              setIsOver(false);
            }, 250);
          }}
          videoRef={videoRef()}
          movie={props.movie}
        />
      </Show>
    </div>
  );
};
