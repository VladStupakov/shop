import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import { authRoutes, publicRoutes } from "../routes";
import { useSelector } from 'react-redux';
import { HOME_PAGE_ROUTE } from '../utils/consts';


const AppRouter = () => {

    const user = useSelector((state) => state.user.currentUser)

    return (
        <Routes>
            {user && authRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}
            {publicRoutes.map(({ path, Component }) =>
                <Route key={path} path={path} element={Component} exact />
            )}
            <Route
                path="*"
                element={<Navigate to={HOME_PAGE_ROUTE} replace />}
            />
        </Routes>
    )
}

export default AppRouter