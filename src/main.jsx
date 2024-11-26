import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {RouterProvider} from "react-router-dom"
import "./index.css";
import router from "./router";
import { CategoriesProvider } from "./store/getCategories/getCategories";
import { ArticlesProvider } from "./store/storePosts";
import { UsersProvider } from "./store/getUsers/getUsers";
import { AuthorsProvider } from "./store/getAuthors/getAuthors";
import { AuthProvider } from "./store/authContex";
import { ProfileProvider } from "./store/profileContext";

function AppProvider({children}) {
  return(
    <AuthProvider>
    <UsersProvider>
    <ProfileProvider>
    <AuthorsProvider>
    <CategoriesProvider>
    <ArticlesProvider>
    {children}
    </ArticlesProvider>
    </CategoriesProvider>
    </AuthorsProvider>
    </ProfileProvider>
    </UsersProvider>
    </AuthProvider>
  )
}

createRoot(document.getElementById("root")).render(
  <StrictMode> 
    <AppProvider>
    <RouterProvider router={router} />
    </AppProvider>
  </StrictMode>,
);
