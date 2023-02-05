import React, { useState, Suspense, lazy, useEffect } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import { Switch, Route } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { currentUser } from './constants/urls';
import { auth } from './firebase';

const Home = lazy(() => import('./pages/Home'));
const CreateCategory = lazy(() => import('./pages/Category/CreateCategory'));
const AddMovies = lazy(() => import('./pages/Movies/AddMovie'));
const MovieDetails = lazy(() => import('./pages/Movies/MovieDetails'));
const Subscibe = lazy(() => import('./pages/SubScribe'));

function App() {
  const [loginModal, setLoginModal] = useState();

  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const tokenId = await user.getIdTokenResult();
        currentUser(tokenId.token)
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name,
                email: res.data.email,
                role: res.data.role,
                _id: res.data._id,
                token: tokenId.token
              }
            })
          })
          .catch((err) => console.log("Error", err))
      }
    })
    return () => unsubscribe();
  }, [dispatch])

  return (
    <>
      <div className="clone-sticker top-sticker text-white bg-primary px-5 py-2">Disney+ Clone</div>
      <Header openLogin={() => setLoginModal(!loginModal)} />
      <div className="main-container">
        <Switch>
          <Suspense fallback={<Skeleton className="form-container mt-4" style={{ height: 'calc(100vh - 100px)' }} />}>
            <Route path="/" exact component={Home} />
            <Route path="/category" exact component={CreateCategory} />
            <Route path="/movie-details/:movieId" exact component={MovieDetails} />
            <Route path="/movie-details/:movieId/:episodeId" exact component={MovieDetails} />
            <Route path="/subscribe" exact component={Subscibe} />
            <Route path="/add-movie" exact component={AddMovies} />
          </Suspense>
        </Switch>
        <Footer/>
      </div>
      <Login show={loginModal} close={() => setLoginModal(!loginModal)} />
    </>
  );
}

export default App;
