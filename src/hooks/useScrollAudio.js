import { useCallback, useEffect, useRef, useState } from "react";

const TARGET_VOLUME = 0.68;

function fadeAudio(audio, targetVolume, onDone) {
  const step = targetVolume > audio.volume ? 0.035 : -0.035;

  const fade = window.setInterval(() => {
    const nextVolume = audio.volume + step;
    const reached = step > 0 ? nextVolume >= targetVolume : nextVolume <= targetVolume;

    audio.volume = reached ? targetVolume : Math.max(0, Math.min(1, nextVolume));

    if (reached) {
      window.clearInterval(fade);
      onDone?.();
    }
  }, 28);

  return () => window.clearInterval(fade);
}

export function useScrollAudio(tracks) {
  const audioRef = useRef(null);
  const activeTrackRef = useRef(0);
  const activeStartAtRef = useRef(0);
  const isUnlockedRef = useRef(false);
  const isMutedRef = useRef(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [audioNote, setAudioNote] = useState("ждет первого клика");

  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = false;
    audioRef.current.preload = "auto";
    audioRef.current.volume = TARGET_VOLUME;

    const replayFromHighlight = () => {
      const audio = audioRef.current;
      if (!audio || isMutedRef.current) return;
      audio.currentTime = activeStartAtRef.current;
      audio.play().catch(() => {});
    };

    audioRef.current.addEventListener("ended", replayFromHighlight);

    return () => {
      audioRef.current?.removeEventListener("ended", replayFromHighlight);
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  const playTrack = useCallback(
    async (trackIndex) => {
      const audio = audioRef.current;
      const track = tracks[trackIndex];

      if (!audio || !track || !isUnlockedRef.current || isMutedRef.current) return;

      if (activeTrackRef.current === trackIndex && !audio.paused) {
        return;
      }

      const start = async () => {
        const startAt = track.startAt ?? 0;
        activeTrackRef.current = trackIndex;
        activeStartAtRef.current = startAt;
        setActiveTrack(trackIndex);
        audio.src = track.src;
        audio.addEventListener(
          "loadedmetadata",
          () => {
            audio.currentTime = startAt;
          },
          { once: true },
        );
        try {
          audio.currentTime = startAt;
        } catch {
          // Metadata may not be ready yet; loadedmetadata will seek for us.
        }
        audio.volume = 0;
        setAudioNote(`${track.artist} - ${track.title} · ${track.highlight ?? "0:00"}`);

        try {
          await audio.play();
          fadeAudio(audio, TARGET_VOLUME);
        } catch {
          setAudioNote(`${track.artist} - ${track.title} · добавь mp3`);
        }
      };

      if (!audio.paused) {
        fadeAudio(audio, 0, start);
        return;
      }

      await start();
    },
    [tracks],
  );

  const unlock = useCallback(() => {
    isUnlockedRef.current = true;
    isMutedRef.current = false;
    setIsUnlocked(true);
    setIsMuted(false);
    window.setTimeout(() => {
      const visibleTrack = Number(
        document.querySelector("[data-scene].is-current")?.dataset.track ?? 0,
      );
      playTrack(visibleTrack);
    }, 0);
  }, [playTrack]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;

    if (!isUnlocked) {
      unlock();
      return;
    }

    setIsMuted((current) => {
      const next = !current;
      isMutedRef.current = next;

      if (next) {
        audio?.pause();
        setAudioNote("музыка на паузе");
      } else {
        window.setTimeout(() => playTrack(activeTrackRef.current), 0);
      }

      return next;
    });
  }, [isUnlocked, playTrack, unlock]);

  useEffect(() => {
    const scenes = [...document.querySelectorAll("[data-scene]")];

    if (!scenes.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        scenes.forEach((scene) => scene.classList.remove("is-current"));
        visible.target.classList.add("is-current");
        playTrack(Number(visible.target.dataset.track));
      },
      { threshold: [0.36, 0.5, 0.68] },
    );

    scenes.forEach((scene) => observer.observe(scene));
    scenes[0]?.classList.add("is-current");

    return () => observer.disconnect();
  }, [playTrack]);

  return {
    activeTrack,
    audioNote,
    isMuted,
    isUnlocked,
    unlock,
    toggleMute,
  };
}
