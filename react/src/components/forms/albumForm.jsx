import React, { useEffect, useState } from "react";
import { InputComponent, SelectComponent, StyledForm } from "./formComponents";
import { Main } from "./../../App";
import { getArtists } from "./../../services/artistService";

const AlbumForm = () => {
    const [data, setData] = useState({ title: "", release_date: "", release_type: "", artist_id: "", genres: [] });
    const [artistsOptions, setArtistsOptions] = useState([]);

    const releaseTypeOptions = [
        { value: "LP", label: "LP" },
        { value: "Single", label: "Single" },
        { value: "EP", label: "EP" },
        { value: "Live", label: "Live album" },
    ];

    useEffect(async () => {
        // Get artists from API and use them as options in select component
        const { data: artists } = await getArtists();
        const artistsOptions = [];
        artists.forEach((a) => {
            artistsOptions.push({ value: a.id, label: a.name });
        });
        setArtistsOptions(artistsOptions);
    }, []);

    useEffect(async () => {
        // Get genres from API and use them as options in select component
        // TODO!
        // TODO!
        // TODO!
        const { data: artists } = await getArtists();
        const artistsOptions = [];
        artists.forEach((a) => {
            artistsOptions.push({ value: a.id, label: a.name });
        });
        setArtistsOptions(artistsOptions);
    }, []);

    console.log(data);

    const handleSubmit = () => {};

    return (
        <Main pushUnderNavbar={true}>
            <StyledForm onSubmit={handleSubmit}>
                <InputComponent name="title" label="Album title" data={data} setData={setData} />
                <InputComponent type="date" name="release_date" label="Release date" data={data} setData={setData} placeholder="YYYY-MM-DD" />
                <SelectComponent name="release_type" label="Release type" options={releaseTypeOptions} data={data} setData={setData} />
                <SelectComponent name="artist_id" isSearchable={true} label="Album artist" options={artistsOptions} data={data} setData={setData} />
                <SelectComponent
                    name="genres"
                    isSearchable={true}
                    isMulti={true}
                    label="Genres"
                    options={artistsOptions}
                    data={data}
                    setData={setData}
                />
            </StyledForm>
        </Main>
    );
};

export default AlbumForm;
