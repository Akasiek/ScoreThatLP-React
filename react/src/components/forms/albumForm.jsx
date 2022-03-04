import React, { useEffect, useState } from "react";
import Joi from "joi-browser";
import { Helmet } from "react-helmet";
import { InputComponent, FileInputComponent, SelectComponent, StyledForm, SubmitBtnComponent, validate } from "./formComponents";
import { Main } from "./../../App";
import { getArtists } from "./../../services/artistService";
import { saveAlbum } from "./../../services/albumService";

const AlbumForm = ({ history }) => {
    const [data, setData] = useState({ title: "", release_date: "", release_type: "", artist_id: "" });
    const [artCover, setArtCover] = useState();
    const [artistsOptions, setArtistsOptions] = useState([]);
    const [errors, setErrors] = useState({});

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

    useEffect(async () => {
        // Get artists from API and use them as options in select component
        const { data: artists } = await getArtists();
        const artistsOptions = [];
        artists.forEach((a) => {
            artistsOptions.push({ value: a.id, label: a.name });
        });
        setArtistsOptions(artistsOptions);
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(data, schema);
        if (errors) {
            // Stupid fix but works...
            if (errors["artist_id"] == '"Artist" must be a number') errors["artist_id"] = '"Artist" is not allowed to be empty';

            setErrors(errors);
            return;
        }

        let apiData = new FormData();
        for (let key in data) {
            if (data[key] === "") apiData.append(key, null);
            else apiData.append(key, data[key]);
        }
        apiData.append("art_cover", artCover);

        await saveAlbum(apiData);
        history.push("/albums/");
    };

    return (
        <Main pushUnderNavbar={true}>
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
                <FileInputComponent name="art_cover" label="Art cover" setFile={setArtCover} />
                <SubmitBtnComponent value="Upload album" />
            </StyledForm>
        </Main>
    );
};

export default AlbumForm;
