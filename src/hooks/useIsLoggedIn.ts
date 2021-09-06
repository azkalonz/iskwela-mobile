import { useEffect, useState } from "react";
import { useStoreState } from "../redux/store";

export default function () {
  const { isLoggedIn } = useStoreState((states) => states.userStorage);
  const [a, b] = useState(isLoggedIn);

  useEffect(() => {
    b(isLoggedIn);
  }, [isLoggedIn]);

  return isLoggedIn;
}
