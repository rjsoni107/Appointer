import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import '../index.css';
import '../assets/css/root.css';
import '../assets/css/styles.css';
import '../assets/css/common-style.css';
import '../assets/js/global.js';
import "aos/dist/aos.css";
import { AuthProvider } from '../contexts/AuthContext.jsx';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import Home from '../pages/Home.jsx';
import { PublicLayout } from '../components/index.js';

const router = createBrowserRouter([
    {
        path: '/',
        element: <PublicLayout />,
        children: [
            { index: true, element: <Home /> },
            { path: 'home', element: <Navigate to="/" replace /> },
            { path: 'index', element: <Navigate to="/" replace /> },
        ],
    },
    {
        path: '*',
        element: <Navigate to="/" replace />,
    },
]);

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </Provider>
)
