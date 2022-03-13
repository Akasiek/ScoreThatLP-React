import React, { useState, useEffect } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import jwtDecode from "jwt-decode";

import ProtectedRoute from "./components/common/protectedRoute";
import HomePage from "./components/homePage";
import SearchPage from "./components/searchPage";
import NotFound from "./components/notFound";
import Navbar from "./components/nav/navbar";
import { handleLogout } from "./components/nav/navBarProfileContainer";
import Albums from "./components/albums";
import AlbumForm from "./components/forms/albumForm";
import AlbumPage from "./components/albumPage/albumPage";
import ReviewsPage from "./components/albumPage/reviewsPage/reviewsPage";
import Artists from "./components/artists";
import ArtistPage from "./components/artistPage/artistPage";
import ArtistForm from "./components/forms/artistForm";
import NewReleases from "./components/newReleases";
import AOTY from "./components/aoty";
import ProfilePage from "./components/profilePage/profilePage";
import ProfileReviews from "./components/profilePage/profileReviews";
import ProfileRatings from "./components/profilePage/profileRatings";
import LoginForm from "./components/forms/loginForms/loginForm";
import Footer from "./components/footer";
import UserContext from "./context/userContext";
import { getReviewerWithUser } from "./services/reviewerService";
import { setJwt } from "./services/httpService";

import styled, { ThemeProvider } from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import RegisterForm from "./components/forms/loginForms/registerForm";
import SettingsForm from "./components/profilePage/settingsForm";

const theme = {
    colors: {
        accentColor: "#e94560",
        lightColor: "#edf7f6",
        darkestColor: "#1a1a2e",
        darkBlueColor: "#16213e",
        blueColor: "#0f3460",
    },
    ratingColors: {
        green: "#20e9a9",
        yellow: "#ffc971",
        red: "#c91835",
    },
    mobile: "55rem",
};

const StyledToastContainer = styled(ToastContainer)`
    /* Toastify style */
    --toastify-font-family: "Montserrat";
    --toastify-color-dark: var(--darkBlueColor);
    --toastify-text-color-dark: var(--lightColor);
`;

const StyledApp = styled.div`
    font-family: "Montserrat", sans-serif;
    font-weight: 900;
`;

export const Main = styled.main`
    max-width: 1550px;
    margin: 0 auto;
`;

const App = () => {
    const [user, setUser] = useState();

    useEffect(() => {
        (async () => {
            if (localStorage.getItem("jwt")) {
                const accessToken = localStorage.getItem("jwt");
                const jwt = jwtDecode(accessToken);
                setJwt(`JWT ${accessToken}`);
                try {
                    const { data: reviewer } = await getReviewerWithUser(jwt.user_id);
                    setUser(reviewer[0]);
                } catch (ex) {
                    if (ex.response && ex.response.status === 401) {
                        handleLogout();
                    }
                }
            }
        })();
    }, [user?.id]);

    return (
        <ThemeProvider theme={theme}>
            <StyledToastContainer theme="dark" autoClose={4000} pauseOnFocusLoss={false} transition={Slide} position="bottom-right" />
            <UserContext.Provider value={[user, setUser]}>
                <StyledApp>
                    <Navbar />
                    <Switch>
                        <Route exact path="/" component={HomePage} />

                        {/* ALBUMS */}
                        <Route exact path="/albums" component={Albums} />
                        <Route exact path="/new-releases" component={NewReleases} />
                        <Route exact path="/aoty" component={AOTY} />
                        <ProtectedRoute exact path="/albums/new" component={AlbumForm} />
                        <Route exact path="/albums/:id" component={AlbumPage} />
                        <Route exact path="/albums/:id/reviews" component={ReviewsPage} />

                        {/* ARTISTS */}
                        <Route exact path="/artists" component={Artists} />
                        <ProtectedRoute exact path="/artists/new" component={ArtistForm} />
                        <Route exact path="/artists/:slug" component={ArtistPage} />
                        <ProtectedRoute exact path="/artists/:slug/new-album" component={AlbumForm} />

                        {/* USERS */}
                        <Route exact path="/users/:username" component={ProfilePage} />
                        <Route exact path="/users/:username/reviews" component={ProfileReviews} />
                        <Route exact path="/users/:username/ratings" component={ProfileRatings} />
                        <ProtectedRoute exact path="/users/:username/settings" component={SettingsForm} />
                        <Route exact path="/login" component={LoginForm} />
                        <Route exact path="/register" component={RegisterForm} />

                        <Route exact path="/search/:searchQuery" component={SearchPage} />
                        <Route path="/not-found" component={NotFound} />
                        <Redirect from="*" to="/not-found" />
                    </Switch>
                    <Footer />
                </StyledApp>
            </UserContext.Provider>
        </ThemeProvider>
    );
};

export default App;
