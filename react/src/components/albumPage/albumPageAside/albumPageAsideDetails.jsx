import React from "react";
import moment from "moment";

const AlbumPageAsideDetails = ({ album }) => {
    return (
        <div className="albumDetails">
            <h3>Details</h3>
            <hr />
            <ul>
                <li>
                    Release Date: <span style={{ fontWeight: 900 }}>{moment(album.release_date).format("Do MMMM YYYY")}</span>
                </li>
                <li>
                    Release Format: <span style={{ fontWeight: 900 }}>{album.release_type}</span>
                </li>
                {album.genres.length !== 0 && (
                    <li>
                        Genres:
                        {album.genres.map((g, index) => {
                            {
                                // TODO: Genres links
                            }
                            return (
                                <span key={index} className="genreLink" style={{ fontWeight: 900 }}>
                                    {g}
                                </span>
                            );
                        })}
                    </li>
                )}
            </ul>
        </div>
    );
};

export default AlbumPageAsideDetails;
