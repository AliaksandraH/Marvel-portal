import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import "./charInfo.scss";

const CharInfo = (props) => {
    const [char, setChar] = useState(null);

    const { process, getCharacter, clearError, setProcess } =
        useMarvelService();

    useEffect(() => {
        if (props.charId !== null) {
            updateChar();
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const { id, name, thumbnail, comics } = data;
    let notComics = "";
    if (comics.length === 0) {
        notComics = "This persanage does not have a list of comics.";
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
                        <Link
                            to={`/characters/${id}`}
                            className="button button__main"
                        >
                            <div className="inner">homepage</div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {notComics}
                {comics.map((item, i) => {
                    if (i < 3) {
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        );
                    }
                    if (i === 3) {
                        return (
                            <li key={i} className="char__comics-more">
                                More comics on the character's Page.
                            </li>
                        );
                    }
                    // eslint-disable-next-line array-callback-return
                    return;
                })}
            </ul>
        </>
    );
};

CharInfo.propTypes = {
    charId: PropTypes.number.isRequired,
};

export default CharInfo;
