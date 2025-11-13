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
import { ThemeProvider } from '../contexts/ThemeContext.jsx';
import { PrivateLayout } from '../components/index.js';
import Dashboard from '../pages/dashboard/Dashboard.jsx';
import MyAccount from '../pages/myAccount/MyAccount.jsx';
import MyOrder from '../pages/myOrder/MyOrder.jsx';
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
        path: '/',
        element: <PrivateLayout />,
        children: [
            { index: true, element: <Navigate to="/dashboard" replace /> },
            { path: 'dashboard', element: <Dashboard /> },
            { path: 'my-account', element: <MyAccount /> },
            { path: 'my-orders', element: <MyOrder /> },
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
            <ThemeProvider>
                <RouterProvider router={router} />
            </ThemeProvider>
        </AuthProvider>
    </Provider>
)
