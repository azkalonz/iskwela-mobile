import { Dispatch, SetStateAction, useEffect, useState } from "react";

export default function <T = []>(
  objValue?: any
): [T, Dispatch<SetStateAction<T>>, T] {
  const [obj, setObj] = useState<T>(objValue || []);

  useEffect(() => {
    if (objValue) {
      setObj(objValue);
    }
  }, [objValue]);

  return [obj, setObj, objValue];
}
