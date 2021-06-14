import React from "react"
import { Route } from "react-router-dom"
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
                </Route>
            </SongProvider>
            </PlaylistProvider>

            <PlaylistProvider>
            <SongProvider>
                <Route exact path="/search">
                    <SongList />
                </Route>
            </SongProvider>
            </PlaylistProvider>

            <PlaylistProvider>
                <Route exact path="/playlists">
                    <PlaylistList />
                </Route>
                <Route exact path="/playlists/:playlistId(\d+)">
                    <PlaylistDetail />
                </Route>
            </PlaylistProvider>
        </>
    )
}
