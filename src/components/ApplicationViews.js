import React from "react"
import { Route } from "react-router-dom"
import { Home } from "./Home"
import { PlaylistList } from "./playlist/PlaylistList"
import { PlaylistProvider } from "./playlist/PlaylistProvider"
import { SongList } from "./song/SongList"
import { SongProvider } from "./song/SongProvider"

export const ApplicationViews = () => {
    return (
        <>
            {/* Render the location list when http://localhost:3000/ */}
            <Route exact path="/">
                <Home />
            </Route>

            <SongProvider>
                <Route exact path="/search">
                    <SongList />
                </Route>
            </SongProvider>

            <PlaylistProvider>
                <Route exact path="/playlists">
                    <PlaylistList />
                </Route>
            </PlaylistProvider>
        </>
    )
}
