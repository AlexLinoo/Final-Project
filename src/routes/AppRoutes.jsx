import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage"
import NewProductPage from "../pages/NewProduct/NewProduct"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
import ProductListPage from "../pages/ProductListPage/ProductListPage"
import SignupPage from "../pages/SignUpPage/SignUpPage"





const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<p>INICIO</p>} />
            <Route path="/productos" element={<ProductListPage />} />
            <Route path="/detalles/:product_id" element={<ProductDetailPage />} />
            <Route path="/mi-perfil" element={<p>Mi perfil</p>} />
            <Route path="/crear-producto" element={<NewProductPage />} />
            <Route path="/centros" element={<p>Centros</p>} />
            <Route path="/perfil-centro" element={<p>Perfil de Asociación</p>} />
            <Route path="/usuarios" element={<p>Usuarios</p>} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/iniciar-sesion" element={<LoginPage />} />
            <Route path="/*" element={<p>404</p>} />
        </Routes>
    )
}
export default AppRoutes