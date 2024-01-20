import { MovieType } from "./types";
import styles from "./Fullview.module.css";
import { Component, createEffect, createSignal } from "solid-js";

type FullviewProps = {
  onClose: () => void;
  movie: MovieType;
  videoRef: HTMLVideoElement | null;
};

export const Fullview: Component<FullviewProps> = (props) => {
  const [videoWrapperRef, setVideoWrapperRef] =
    createSignal<HTMLDivElement | null>(null);

  const [initialVideoBounds, setInitialVideoBounds] =
    createSignal<DOMRect | null>(null);

  const internalClose = () => {
    const wrapperRef = videoWrapperRef();
    const videoBounds = initialVideoBounds();

    if (props.videoRef && wrapperRef && videoBounds) {
      const wrapperBounds = wrapperRef.getBoundingClientRect();
      const animation = props.videoRef.animate(
        [
          {
            composite: "replace",
            position: "fixed",
            height: `${wrapperBounds.height}px`,
            width: `${wrapperBounds.width}px`,
            top: `${wrapperBounds.y}px`,
            left: `${wrapperBounds.x}px`,
          },
          {
            composite: "replace",
            position: "fixed",
            width: `${videoBounds.width}px`,
            height: `${videoBounds.height}px`,
            top: `${videoBounds.y}px`,
            left: `${videoBounds.x}px`,
          },
        ],
        { duration: 250, fill: "forwards" }
      );

      animation.addEventListener("finish", () => {
        props.onClose();
      });
    } else {
      props.onClose();
    }
  };

  createEffect(() => {
    const wrapperRef = videoWrapperRef();

    if (props.videoRef && wrapperRef) {
      const wrapperBounds = wrapperRef.getBoundingClientRect();
      const videoBounds = props.videoRef.getBoundingClientRect();
      setInitialVideoBounds(videoBounds);
      props.videoRef.animate(
        [
          {
            composite: "replace",
            position: "fixed",
            width: `${videoBounds.width}px`,
            height: `${videoBounds.height}px`,
            top: `${videoBounds.y}px`,
            left: `${videoBounds.x}px`,
          },
          {
            composite: "replace",
            position: "fixed",
            height: `${wrapperBounds.height}px`,
            width: `${wrapperBounds.width}px`,
            top: `${wrapperBounds.y}px`,
            left: `${wrapperBounds.x}px`,
          },
        ],
        { duration: 250, fill: "forwards" }
      );
    }
  });

  return (
    <>
      <div class={styles.backdrop} />
      <div class={styles.container}>
        <button onClick={internalClose} class={styles.closeButton}>
          X
        </button>
        <div class={styles.videoWrapper} ref={setVideoWrapperRef}></div>
        <div class={styles.movieInfo}>
          <img src={props.movie.posterUrl} class={styles.poster} />
          <div class={styles.title}>{props.movie.title}</div>
          <div class={styles.synopsis}>{props.movie.synopsis}</div>
        </div>
      </div>
    </>
  );
};
