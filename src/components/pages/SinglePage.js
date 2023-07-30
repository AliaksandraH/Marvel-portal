import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";
import AppBanner from "../appBanner/AppBanner";

const SinglePage = ({ Component, dataType }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const { process, setProcess, getComic, getCharacter, clearError } =
        useMarvelService();

    useEffect(() => {
        updateData();
    }, [id]);

    const updateData = () => {
        clearError();

        if (dataType === "comic") {
            getComic(id)
                .then(onDataLoaded)
                .then(() => setProcess("confirment"));
        } else {
            getCharacter(id)
                .then(onDataLoaded)
                .then(() => setProcess("confirment"));
        }
    };

    const onDataLoaded = (data) => {
        setData(data);
    };

    return (
        <>
            <AppBanner />
            {setContent(process, Component, data)}
        </>
    );
};

export default SinglePage;
