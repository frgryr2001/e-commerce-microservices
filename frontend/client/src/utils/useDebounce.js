import React, { useState } from "react";

export default function useDebounce(func) {
  const [TypeTimeOut, setTypeTimeOut] = useState("");

  function debounce(func, wait) {
    clearTimeout(TypeTimeOut);
    const timeout = setTimeout(() => {
      func();
    }, wait);
    setTypeTimeOut(timeout);
  }
  return debounce;
}
