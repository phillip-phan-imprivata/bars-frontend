import { render } from "@testing-library/react"
import React, { useContext, useEffect } from "react"
import { SongContext } from "../song/SongProvider"
import "./Footer.css"

export const Footer = () => {
    const {videoLink} = useContext(SongContext)

    const renderVideo = (link) => {        
        if (link !== ""){
            return (
                <iframe 
                    width="175"
                    height="175" 
                    src={`https://www.youtube.com/embed/${link}?autoplay=1`}
                    title="YouTube Video"
                    autoPlay="On"
                    allow="autoplay"
                    allowFullScreen
                    />
            )
        }
    }

    return (
        <footer className="currentSong">
            {renderVideo(videoLink)}
        </footer>
    )
}