// import { lazy, Suspense } from "react";

import { HashRouter, Routes, Route, Navigate } from "react-router";
import { ReactRouterAppProvider } from "@toolpad/core/react-router";

import App from "./App";

import { HomePage } from "./pages/HomePage";
import SingInPage from "./pages/SingInPage/SingInPage";
import SingUpPage from "./pages/SingUpPage/SingUpPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { QuestPage } from "./pages/QuestPage";
import { ProfilePage } from "./pages/ProfilePage";
import { СreateQuestPage } from "./pages/СreateQuestPage";

// Налаштувати лоадери для сторінок за потреби
// import FavouritesPageLoader from "./pages/FavouritesPage/Loader";

// Треба буде налаштувати lazy loading за потреби
// const ProductInfo = lazy(
//   () =>
//     import(
//       /* webpackChunkName: "ProductInfo" */ "@/pages/ProductInfoPage/ProductInfoPage"
//     )
// );

export const Root = () => (
  <HashRouter>
    <ReactRouterAppProvider>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />

          <Route path="home" element={<Navigate to="/" replace />} />

          <Route path="sing-in">
            <Route index element={<SingInPage />} />
          </Route>

          <Route path="sing-up">
            <Route index element={<SingUpPage />} />
          </Route>

          <Route path="profile">
            <Route index element={<ProfilePage />} />
          </Route>

          <Route path="create">
            <Route index element={<СreateQuestPage />} />
          </Route>

          <Route path="quest">
            <Route index element={<QuestPage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>{" "}
    </ReactRouterAppProvider>
  </HashRouter>
);
