import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { NavBar } from "./nav/NavBar"
import { Login } from "./auth/Login"
import { Register } from "./auth/Register"
import { Footer } from "./footer/Footer"
import { SongProvider } from "./song/SongProvider"
import "./Bars.css"

export const Bars = () => {
    return <>
        <Route render={() => {
            if (localStorage.getItem("bars_token")) {
                return <>
                        <Route render={NavBar} />
                        <Route render={props => <ApplicationViews {...props} />} />
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />

        <Route path="/login" render={Login} />
        <Route path="/register" render={Register} />
    </>
}
