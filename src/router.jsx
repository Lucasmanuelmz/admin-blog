import { createBrowserRouter } from "react-router-dom";
import App from './App';
import PostEditor from "./Views/newPost";
import CategoryPost from "./Views/newCategory";
import SignupForm from "./Views/signup";
import LoginForm from "./Views/auth";
import AuthorForm from "./Views/newAuthor";
import UserList from "./Views/allUsers";
import { RenderingUser } from "./Views/updateUser";
import PostList from "./Views/allPosts";
import { RenderingPost } from "./Views/updatePost";
import { RenderingCategory } from "./Views/updateCategory";
import CategoriesList from "./Views/allCategories";
import UserProfile from "./Views/profile";
import ProtectedRoute from "./components/protected";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <LoginForm />
      },
      {
        path: 'profile',
        element: <UserProfile />
      },
      {
        path: 'categories',
        element: <ProtectedRoute element={<CategoriesList />} />
      },
      {
        path: 'create/category',
        element: <ProtectedRoute element={ <CategoryPost />} />
      },
      {
        path: 'category/:id/update',
        element: <ProtectedRoute element={<RenderingCategory />} />
      },
      {
       path: 'articles/list',
       element: <ProtectedRoute element={ <PostList />} />
      },
      {
       path: 'article/:id/update',
       element: <ProtectedRoute element={<RenderingPost />} />
      },
      {
        path: 'user/:id/become/author',
        element:<ProtectedRoute element={<AuthorForm />} />
      }, 
      {
        path: 'users',
        element: <UserList />
      },
      {
        path: 'user/:id/update',
        element: <ProtectedRoute element={<RenderingUser />} />
      }
    ]
  },
  {
    path: '/signup',
    element: <SignupForm />
  },
  {
    path: '/login',
    element: <LoginForm />
  },
  {
    path:'/user/:userId/create/article',
    element:<ProtectedRoute element={<PostEditor />} />
  },
]);

export default router;
