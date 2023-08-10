import { useState } from "react";
import { Helmet } from "react-helmet";

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import CharSearchForm from "../charSearchForm/CharSearchForm";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

import "./mainPage.scss";

const MainPage = () => {
    const [selectedChar, setChar] = useState(0);

    const onCharSelected = (id) => {
        setChar(id);
    };

    return (
        <>
            <Helmet>
                <meta name="description" content="Marvel information portal" />
                <title>Marvel information portal</title>
            </Helmet>
            <ErrorBoundary>
                <RandomChar />
            </ErrorBoundary>
            <div className="char__content">
                <ErrorBoundary>
                    <CharList onCharSelected={onCharSelected} />
                </ErrorBoundary>
                <div className="main__panel">
                    <ErrorBoundary>
                        <CharSearchForm />
                    </ErrorBoundary>
                    <ErrorBoundary>
                        <CharInfo charId={selectedChar} />
                    </ErrorBoundary>
                </div>
            </div>
        </>
    );
};

export default MainPage;
