import React from "react";
import moment from "moment";
import _ from "lodash";

const AlbumPageAsideTracks = ({ album }) => {
    return (
        <div className="albumTracks">
            <h3>Tracks</h3>
            <hr />
            {_.orderBy(album.tracks, (t) => t.position, ["asc"]).map((t, index) => {
                return (
                    <div key={index} className="trackContainer">
                        <p className="trackPosition">{t.position}.</p>
                        <p className="trackTitle">{t.title}</p>
                        <p className="trackDuration">{moment(t.duration, [moment.ISO_8601, "HH:MM:ss"]).format("MM:ss")}</p>
                    </div>
                );
            })}
            {
                // TODO: Full album length
            }
            <p className="albumDuration">
                <span style={{ fontWeight: "normal" }}>Album duration: </span>
                {moment.duration(album.album_duration).humanize()}
            </p>
        </div>
    );
};

export default AlbumPageAsideTracks;
