import { useState, useEffect } from "react";
import PropTypes from "prop-types";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./charInfo.scss";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { process, getCharacter, clearError, setProcess } =
        useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {
        if (!props.charId) {
            return;
        }
        clearError();
        getCharacter(props.charId)
            .then(onCharLoaded)
            .then(() => setProcess("confirment"));
    };

    const onCharLoaded = (char) => {
        setChar(char);
    };

    return <div className="char__info">{setContent(process, View, char)}</div>;
};

const View = ({ data }) => {
    const { name, description, thumbnail, homepage, wiki, comics } = data;
    let notComics = "";
    if (comics.length === 0) {
        notComics = "This persanage does not have a list of comics";
    }

    let classForImg = { objectFit: "cover" };
    if (
        thumbnail ===
        "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ) {
        classForImg = { objectFit: "contain" };
    }

    return (
        <>
            <div className="char__basics">
                <img src={thumbnail} alt={name} style={classForImg} />
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description.length !== 0
                    ? description
                    : "There is no description for this character"}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {notComics}
                {comics.map((item, i) => {
                    if (i < 10) {
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        );
                    } else {
                        return;
                    }
                })}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number.isRequired,
};

export default CharInfo;
