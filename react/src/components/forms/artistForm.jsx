import React, { useContext, useState } from "react";
import Joi from "joi-browser";
import { Helmet } from "react-helmet";
import { InputComponent, FileInputComponent, StyledForm, SubmitBtnComponent, validate } from "./formComponents";
import { Main } from "./../../App";
import { saveArtist } from "./../../services/artistService";
import ReviewerContext from "../../context/reviewerContext";

const ArtistForm = ({ history }) => {
    const [data, setData] = useState({ name: "" });
    const [artistImage, setArtistImage] = useState();
    const [artistImageBG, setArtistImageBG] = useState();
    const [errors, setErrors] = useState({});
    const currentReviewer = useContext(ReviewerContext)[0];

    const schema = {
        name: Joi.string().required().label("Name"),
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const errors = validate(data, schema);
        if (errors) {
            setErrors(errors);
            return;
        }

        let apiData = new FormData();
        for (let key in data) {
            if (data[key] === "") apiData.append(key, null);
            else apiData.append(key, data[key]);
        }
        if (artistImage.file) apiData.append("image", artistImage.file);
        if (artistImage.url) apiData.append("image_url", artistImage.url);

        if (artistImageBG.file) apiData.append("background_image", artistImageBG.file);
        if (artistImageBG.url) apiData.append("background_image_url", artistImageBG.url);

        apiData.append("created_by", currentReviewer.id);

        await saveArtist(apiData);
        history.push("/artists/");
    };

    return (
        <Main>
            <Helmet>
                <title>Add Artist Form | ScoreThatLP</title>
            </Helmet>
            <StyledForm onSubmit={handleSubmit}>
                <InputComponent name="name" label="Artist name" data={data} setData={setData} errors={errors} />
                <FileInputComponent name="image" label="Artist image (square)" file={artistImage} setFile={setArtistImage} optionalURL={true} />
                <FileInputComponent
                    name="background_image"
                    label="Artist background image"
                    file={artistImageBG}
                    setFile={setArtistImageBG}
                    optionalURL={true}
                />
                <SubmitBtnComponent value="Upload artist" />
            </StyledForm>
        </Main>
    );
};

export default ArtistForm;
