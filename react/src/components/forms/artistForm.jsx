import React, { useContext, useState } from "react";
import Joi from "joi-browser";
import { Helmet } from "react-helmet";
import { InputComponent, FileInputComponent, StyledForm, SubmitBtnComponent, validate } from "./formComponents";
import { Main } from "./../../App";
import { saveArtist } from "./../../services/artistService";
import UserContext from "../../context/userContext";

const ArtistForm = ({ history }) => {
    const [data, setData] = useState({ name: "" });
    const [artistImage, setArtistImage] = useState();
    const [artistImageBG, setArtistImageBG] = useState();
    const [errors, setErrors] = useState({});
    const [currentUser, setCurrentUser] = useContext(UserContext);

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
        apiData.append("image", artistImage);
        apiData.append("background_image", artistImageBG);
        apiData.append("created_by", currentUser.id);

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
                <FileInputComponent name="image" label="Artist image (square)" setFile={setArtistImage} />
                <FileInputComponent name="background_image" label="Artist background image" setFile={setArtistImageBG} />
                <SubmitBtnComponent value="Upload artist" />
            </StyledForm>
        </Main>
    );
};

export default ArtistForm;
