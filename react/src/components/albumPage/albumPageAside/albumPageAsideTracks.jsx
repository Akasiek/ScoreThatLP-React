import React from "react";
import _ from "lodash";

const AlbumPageAsideTracks = ({ album }) => {
    const trimDuration = (duration) => {
        let splitDuration = duration.split(":");
        if (splitDuration[0] === "00") {
            if (splitDuration[1] === "00") return `00:${splitDuration[2]}`;
            return `${splitDuration[1]}:${splitDuration[2]}`;
        }
        return duration;
    };

    const getAlbumDuration = () => {
        let hours = 0;
        let minutes = 0;
        let seconds = 0;

        // For each track add duraction to corresponding variable
        album.tracks.forEach((t) => {
            let splitTime = t.duration.split(":");
            hours += parseInt(splitTime[0]);
            minutes += parseInt(splitTime[1]);
            seconds += parseInt(splitTime[2]);
        });

        // Pass hour or minute if there is more than 60 minutes or seconds
        hours = parseInt(hours + minutes / 60);
        minutes = minutes % 60;
        minutes = parseInt(minutes + seconds / 60);
        seconds = seconds % 60;

        // Add leading zero if needed
        if (hours / 10 <= 0) hours = "0" + String(hours);
        if (minutes / 10 <= 0) minutes = "0" + String(minutes);
        if (seconds / 10 <= 0) seconds = "0" + String(seconds);

        // Return as duration string
        return `${hours}:${minutes}:${seconds}`;
    };

    return (
        <div className="albumTracks">
            <h3>Tracks</h3>
            <hr />
            {_.orderBy(album.tracks, (t) => t.position, ["asc"]).map((t, index) => {
                return (
                    <div key={index} className="trackContainer">
                        <p className="trackPosition">{t.position}.</p>
                        <p className="trackTitle">{t.title}</p>
                        {/* <p className="trackDuration">{moment(t.duration, [moment.ISO_8601, "HH:MM:ss"]).format("MM:ss")}</p> */}
                        <p className="trackDuration">{trimDuration(t.duration)}</p>
                    </div>
                );
            })}
            <p className="albumDuration">
                <span style={{ fontWeight: "normal" }}>Album duration: </span>
                {trimDuration(getAlbumDuration())}
            </p>
        </div>
    );
};

export default AlbumPageAsideTracks;
