import { Route, Routes } from "react-router-dom"
import LoginPage from "../pages/LoginPage/LoginPage"
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage"
import ProductListPage from "../pages/ProductListPage/ProductListPage"
import SignupPage from "../pages/SignUpPage/SignUpPage"
import UserListPage from "../pages/UserListPage/UserListPage"
import UserDetailPage from "../pages/UserDetailPage/UserDetailPage"
import PrivateRoute from "./PrivateRoutes"
import NewAssociationPage from "../pages/NewAssociationPage/NewAssociationPage"
import AssociationListPage from "../pages/AssociationListPage/AssociationListPage"
import AssociationDetailPage from "../pages/AssociationDetailPage/AssociationDetailPage"
import ProfilePage from "../pages/ProfilePage/ProfilePage"
import HomePage from "../pages/HomePage/HomePage"


const AppRoutes = () => {

    return (

        <Routes>

            <Route path="/" element={<HomePage />} />
            <Route path="/productos/detalles/:product_id" element={<ProductDetailPage />} />
            <Route path="/productos" element={<ProductListPage />} />
            <Route path="/centros" element={<AssociationListPage />} />
            <Route path="/centros/detalles/:association_id" element={<AssociationDetailPage />} />
            <Route path="/crear-centro" element={<NewAssociationPage />} />
            <Route path="/registro" element={<SignupPage />} />
            <Route path="/iniciar-sesion" element={<LoginPage />} />


            < Route element={< PrivateRoute />}>
                <Route path="/usuarios/mi-perfil" element={<ProfilePage />} />
                <Route path="/usuarios/perfil/:user_id" element={<UserDetailPage />} />
                <Route path="/usuarios" element={<UserListPage />} />
            </Route >

            <Route path="/*" element={<p>404</p>} />

        </Routes>
    )
}

export default AppRoutes

