import { useEffect } from "react";
import { useBlocker } from "react-router";

export function useViewTransition() {
  const blocker = useBlocker(
    ({ currentLocation, historyAction, nextLocation }) => {
      const currentPath = currentLocation.pathname;
      const nextPath = nextLocation.pathname;

      type NavType = "DEEPER" | "SHALLOWER" | "ADJACENT";
      let navType: NavType;
      if (historyAction == "REPLACE") {
        navType = "ADJACENT";
      } else if (
        nextPath.indexOf(currentPath) == 0 &&
        currentPath != nextPath
      ) {
        navType = "DEEPER";
      } else if (
        currentPath.indexOf(nextPath) == 0 &&
        currentPath != nextPath
      ) {
        navType = "SHALLOWER";
      } else {
        navType = "ADJACENT";
      }

      // Any adjacent navigation action will just be executed immediately
      if (navType == "ADJACENT") return false;

      // Otherwise, specify which view transition to do. We do this with classes, but I'm sure view-transition-type would've been the better option
      document.body.classList.remove("nav-type-deeper");
      document.body.classList.remove("nav-type-shallower");
      document.body.classList.add("nav-type-" + navType.toLowerCase());
      return true;
    },
  );

  useEffect(() => {
    if (blocker.state == "blocked") {
      const vt = document.startViewTransition();
      vt.ready.then(() => blocker.proceed());
    }
  }, [blocker]);
}
