import * as React from "react";

export function useComponentHeight(
  ref: React.MutableRefObject<HTMLElement | null>,
  deps: Array<unknown>
) {
  const [translationHeight, setTranslationHeight] = React.useState(0);

  React.useLayoutEffect(() => {
    if (ref.current) {
      setTranslationHeight(ref.current.clientHeight);
    }
  }, [...deps]);

  React.useEffect(() => {
    function handleWindowResize() {
      if (ref.current) {
        setTranslationHeight(ref.current.clientHeight);
      }
    }
    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  function resetTranslationHeight() {
    setTranslationHeight(0);
  }

  return { translationHeight, resetTranslationHeight };
}
