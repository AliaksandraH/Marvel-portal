import { useState, useEffect } from "react";
import "./randomChar.scss";
import mjolnir from "../../resources/img/mjolnir.png";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const RandomChar = () => {
    const [char, setChar] = useState(null);
    const { process, setProcess, getCharacter, clearError } =
        useMarvelService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 100000);

        return () => {
            clearInterval(timerId);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000)) + 1011000;
        getCharacter(id)
            .then(onCharLoaded)
            .then(() => setProcess("confirment"));
    };

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!
                    <br />
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">Or choose another one</p>
                <button className="button button__main" onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img
                    src={mjolnir}
                    alt="mjolnir"
                    className="randomchar__decoration"
                />
            </div>
        </div>
    );
};

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki } = data;
    const desc = !description
        ? "There is no description for this character"
        : description.slice(0, 170) + "...";
    let classForImg = { objectFit: "cover" };
    if (
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
        classForImg = { objectFit: "contain" };
    }

    return (
        <div className="randomchar__block">
            <img
                src={thumbnail}
                alt="Random character"
                className="randomchar__img"
                style={classForImg}
            />
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">{desc}</p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">Homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    );
};

export default RandomChar;
