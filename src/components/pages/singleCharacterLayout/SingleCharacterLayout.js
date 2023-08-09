import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import "./singleCharacterLayout.scss";
import "../../charInfo/charInfo.scss";

const SingleCharacterLayout = ({ data }) => {
    const { name, description, thumbnail, comics } = data;

    let notComics = "";
    if (comics.length === 0) {
        notComics = "This persanage does not have a list of comics.";
    }

    return (
        <div className="single-character">
            <Helmet>
                <meta name="description" content={`Comic character ${name}`} />
                <title>{name}</title>
            </Helmet>
            <img
                src={thumbnail}
                alt={name}
                className="single-character__char-img"
            />
            <div className="single-character__info">
                <h2 className="single-character__name">{name}</h2>
                <div className="char__comics">Description:</div>
                <p className="single-character__descr">
                    {description.length !== 0
                        ? description
                        : "There is no description for this character."}
                </p>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {notComics}
                    {comics.map((item, i) => {
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        );
                    })}
                </ul>
            </div>
            <Link to="/" className="single-character__back">
                Back to all
            </Link>
        </div>
    );
};

export default SingleCharacterLayout;
