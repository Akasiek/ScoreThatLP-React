import React from "react";
const AlbumPageAsideLinks = ({ album }) => {
    return (
        <div className="albumLinks">
            <h3>Listen to the Album</h3>
            <hr />
            <div className="linksContainer">
                {album.links.map((l, index) => {
                    return (
                        <a key={index} href={l.url} rel="noreferrer" target="_blank">
                            <img src={`/images/serviceIcons/${l.service_name}.svg`} alt={`${l.service_name} music service provider logo`} />
                        </a>
                    );
                })}
            </div>
        </div>
    );
};

export default AlbumPageAsideLinks;
