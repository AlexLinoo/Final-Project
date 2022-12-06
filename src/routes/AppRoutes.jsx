import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage"
import NewProductPage from "../pages/NewProduct/NewProduct"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
import ProductListPage from "../pages/ProductListPage/ProductListPage"
import SignupPage from "../pages/SignUpPage/SignUpPage"
import UserListPage from "../pages/UserListPage/UserListPage"
import UserDetailPage from "../pages/UserDetailPage/UserDetailPage"

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<p>INICIO</p>} />
            <Route path="/productos" element={<ProductListPage />} />
            <Route path="/productos/detalles/:product_id" element={<ProductDetailPage />} />
            <Route path="/mi-perfil" element={<p>Mi perfil</p>} />
            <Route path="/crear-producto" element={<NewProductPage />} />
            <Route path="/centros" element={<p>Centros</p>} />
            <Route path="/perfil-centro" element={<p>Perfil de Asociación</p>} />
            <Route path="/usuarios" element={<UserListPage />} />
            <Route path="/usuarios/detalles/:user_id" element={<UserDetailPage />} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/iniciar-sesion" element={<LoginPage />} />
            <Route path="/*" element={<p>404</p>} />
        </Routes>
    )
}

export default AppRoutes