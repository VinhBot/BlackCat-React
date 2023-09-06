import { Outlet } from "react-router-dom/dist";
import React, { memo } from "react";

const LoadingInit = memo(() => {
  return (
    <div className="preloader">
      <div className="loaders" />
    </div>
  );
});

const Loading = () => {
  return (
    <>
      <React.Suspense fallback={<LoadingInit/>}>
        <Outlet />
      </React.Suspense>
    </>
  );
};

export default Loading;