import React, { useContext, useEffect, useState } from "react";
import Joi from "joi-browser";
import { Helmet } from "react-helmet";
import { InputComponent, FileInputComponent, SelectComponent, StyledForm, SubmitBtnComponent, validate } from "./formComponents";
import { Main } from "./../../App";
import { getArtist, getArtists } from "./../../services/artistService";
import { saveAlbum } from "./../../services/albumService";
import ReviewerContext from "../../context/reviewerContext";

const AlbumForm = ({ history, match }) => {
    const [data, setData] = useState({ title: "", release_date: "", release_type: "", artist_id: "" });
    const [artCover, setArtCover] = useState();
    const [artistsOptions, setArtistsOptions] = useState([]);
    const [errors, setErrors] = useState({});
    const currentReviewer = useContext(ReviewerContext)[0];

    const releaseTypeOptions = [
        { value: "LP", label: "LP" },
        { value: "Single", label: "Single" },
        { value: "EP", label: "EP" },
        { value: "Live", label: "Live album" },
    ];

    const schema = {
        title: Joi.string().required().label("Title"),
        release_date: Joi.date().iso().required().label("Release date"),
        release_type: Joi.string().required().label("Release type"),
        artist_id: Joi.number().label("Artist"),
    };

    useEffect(() => {
        (async () => {
            // Get artists from API and use them as options in select component
            const { data: artists } = await getArtists();

            const artistsOptions = [];
            artists.forEach((a) => {
                artistsOptions.push({ value: a.id, label: a.name });
            });
            setArtistsOptions(artistsOptions);
        })();
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);
        (async () => {
            // If url params have artist slug, set artist value to this artist
            if (match.params.slug) {
                const { data: artists } = await getArtist(match.params.slug);
                const newData = { ...data };
                newData.artist_id = artists.id;
                setData(newData);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [match.params.slug]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(data, schema);
        if (errors) {
            // Stupid fix but works...
            if (errors["artist_id"] === '"Artist" must be a number') errors["artist_id"] = '"Artist" is not allowed to be empty';

            setErrors(errors);
            return;
        }

        let apiData = new FormData();
        for (let key in data) {
            if (data[key] === "") apiData.append(key, null);
            else apiData.append(key, data[key]);
        }
        if (artCover.file) apiData.append("art_cover", artCover.file);
        if (artCover.url) apiData.append("art_cover_url", artCover.url);

        apiData.append("created_by", currentReviewer.id);

        const { data: createAlbum } = await saveAlbum(apiData);
        history.push(`/albums/${createAlbum.id}`);
    };

    return (
        <Main>
            <Helmet>
                <title>Add Album Form | ScoreThatLP</title>
            </Helmet>
            <StyledForm onSubmit={handleSubmit}>
                <InputComponent name="title" label="Album title" data={data} setData={setData} errors={errors} />
                <InputComponent
                    type="date"
                    name="release_date"
                    label="Release date"
                    data={data}
                    setData={setData}
                    placeholder="YYYY-MM-DD"
                    errors={errors}
                />
                <SelectComponent
                    name="release_type"
                    label="Release type"
                    options={releaseTypeOptions}
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <SelectComponent
                    name="artist_id"
                    isSearchable={true}
                    label="Album artist"
                    options={artistsOptions}
                    data={data}
                    setData={setData}
                    errors={errors}
                />
                <FileInputComponent name="art_cover" label="Art cover" file={artCover} setFile={setArtCover} optionalURL={true} />
                <SubmitBtnComponent value="Upload album" />
            </StyledForm>
        </Main>
    );
};

export default AlbumForm;
