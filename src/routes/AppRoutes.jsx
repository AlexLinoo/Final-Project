import { Route, Routes } from "react-router-dom"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
import ProductListPage from "../pages/ProductListPage/ProductListPage"





const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<p>INICIO</p>} />
            <Route path="/productos" element={<ProductListPage />} />
            <Route path="/detalles/:product_id" element={<ProductDetailPage />} />
            <Route path="/mi-perfil" element={<p>Mi perfil</p>} />
            <Route path="/crear-producto" element={<p>Crear producto</p>} />
            <Route path="/centros" element={<p>Centros</p>} />
            <Route path="/perfil-centro" element={<p>Perfil de Asociación</p>} />
            <Route path="/usuarios" element={<p>Usuarios</p>} />
            <Route path="/registro" element={<p>Regístrate</p>} />
            <Route path="/iniciar-sesión" element={<p>Iniciar Sesión</p>} />
            <Route path="/*" element={<p>404</p>} />
        </Routes>
    )
}
export default AppRoutes