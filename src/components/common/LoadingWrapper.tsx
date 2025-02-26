import { useEffect, useState } from "react";
import NProgress from "nprogress";

NProgress.configure({
  minimum: 0.3,
  trickleSpeed: 200,
  showSpinner: false,
});

interface LoadingWrapperProps {
  element: React.ReactElement;
}
export default function LoadingWrapper({ element }: LoadingWrapperProps) {
  const [done, isDone] = useState(false);
  useEffect(() => {
    NProgress.start();
    NProgress.set(0.9);
    setTimeout(() => {
      NProgress.done();
      isDone(true);
    }, 1000);
  }, []);
  return done ? element : null;
}
