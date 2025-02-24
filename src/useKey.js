import { useEffect } from "react";

export function useKey(key, active) {
  useEffect(
    function () {
      function callback(e) {
        if (e.code === key) {
          active();
        }
      }

      document.addEventListener("keydown", callback);

      return function () {
        document.removeEventListener("keydown", callback);
      };
    },
    [active, key]
  );
}
