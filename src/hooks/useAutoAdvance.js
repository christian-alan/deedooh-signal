import { useCallback, useEffect, useReducer, useRef } from 'react';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

const TICK = 100;

function reducer(state, action) {
  switch (action.type) {
    case 'tick': {
      const elapsed = state.elapsed + TICK;
      if (elapsed >= action.duration) return { index: (state.index + 1) % action.count, elapsed: 0 };
      return { ...state, elapsed };
    }
    case 'pick':
      return { index: action.index, elapsed: 0 };
    default:
      return state;
  }
}

/**
 * Cycles through `count` items every `duration` ms, exposing a 0–100 progress
 * value for progress bars. Hovering (pause/resume) or `paused` stops the timer,
 * and it never runs when the visitor prefers reduced motion.
 */
export function useAutoAdvance(count, duration, { paused = false } = {}) {
  const reduce = usePrefersReducedMotion();
  const [state, dispatch] = useReducer(reducer, { index: 0, elapsed: 0 });
  const hold = useRef(false);

  useEffect(() => {
    if (reduce || paused) return undefined;
    const id = setInterval(() => {
      if (hold.current || document.hidden) return;
      dispatch({ type: 'tick', duration, count });
    }, TICK);
    return () => clearInterval(id);
  }, [count, duration, paused, reduce]);

  const pick = useCallback((index) => dispatch({ type: 'pick', index }), []);
  const pause = useCallback(() => { hold.current = true; }, []);
  const resume = useCallback(() => { hold.current = false; }, []);

  return {
    index: state.index,
    progress: Math.min(100, (state.elapsed / duration) * 100),
    pick,
    pause,
    resume,
  };
}
