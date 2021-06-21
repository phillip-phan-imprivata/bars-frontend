import React from "react"
import { Route } from "react-router-dom"
import { Footer } from "./footer/Footer"
import { Home } from "./Home"
import { PlaylistDetail } from "./playlist/PlaylistDetail"
import { PlaylistList } from "./playlist/PlaylistList"
import { PlaylistProvider } from "./playlist/PlaylistProvider"
import { SongList } from "./song/SongList"
import { SongProvider } from "./song/SongProvider"

export const ApplicationViews = () => {
    return (
        <>
            <PlaylistProvider>
            <SongProvider>
                <Route exact path="/">
                    <Home />
                    <Footer />
                </Route>
            </SongProvider>
            </PlaylistProvider>

            <PlaylistProvider>
            <SongProvider>
                <Route exact path="/search">
                    <SongList />
                    <Footer />
                </Route>
            </SongProvider>
            </PlaylistProvider>

            <SongProvider>
            <PlaylistProvider>
                <Route exact path="/playlists">
                    <PlaylistList />
                    <Footer />
                </Route>
                <Route exact path="/playlists/:playlistId(\d+)">
                    <PlaylistDetail />
                    <Footer />
                </Route>
            </PlaylistProvider>
            </SongProvider>
        </>
    )
}
