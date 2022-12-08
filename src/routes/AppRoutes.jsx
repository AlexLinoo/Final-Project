import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage"
import NewProductPage from "../pages/NewProduct/NewProduct"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
import ProductListPage from "../pages/ProductListPage/ProductListPage"
import SignupPage from "../pages/SignUpPage/SignUpPage"
import UserListPage from "../pages/UserListPage/UserListPage"
import UserDetailPage from "../pages/UserDetailPage/UserDetailPage"
import PrivateRoute from "./PrivateRoutes"
import NewAssociationPage from "../pages/NewAssociationPage/NewAssociationPage"
import AssociationListPage from "../pages/AssociationListPage/AssociationListPage"
import AssociationDetailPage from "../pages/AssociationDetailPage/AssociationDetailPage"


const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/" element={<p>INICIO</p>} />
            <Route path="/productos/detalles/:product_id" element={<ProductDetailPage />} />
            <Route path="/productos" element={<ProductListPage />} />
            <Route path="/centros" element={<AssociationListPage />} />
            <Route path="/centros/detalles/:association_id" element={<AssociationDetailPage />} />
            <Route path="/crear-centro" element={<NewAssociationPage />} />
            <Route path="/perfil-centro" element={<p>Perfil de Asociación</p>} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/iniciar-sesion" element={<LoginPage />} />

            < Route element={< PrivateRoute />}>
                <Route path="/crear-producto" element={<NewProductPage />} />
                <Route path="/usuarios/perfil/:user_id" element={<UserDetailPage />} />
                <Route path="/usuarios" element={<UserListPage />} />
                <Route path="/mi-perfil" element={<p>Mi perfil</p>} />
            </Route >

            <Route path="/*" element={<p>404</p>} />

        </Routes>
    )
}

export default AppRoutes

