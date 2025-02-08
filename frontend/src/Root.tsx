// import { lazy, Suspense } from "react";

import { HashRouter, Routes, Route, Navigate } from "react-router";

import App from "./App";

import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
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
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<HomePage />} />

        <Route path="home" element={<Navigate to="/" replace />} />

        <Route path="login">
          <Route index element={<LoginPage />} />
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
    </Routes>
  </HashRouter>
);
