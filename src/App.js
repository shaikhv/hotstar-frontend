import React, { useState, useEffect } from 'react'
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Auth/Login';
import { Switch, Route } from 'react-router-dom'
import { auth } from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from "./constants/urls";

import Home from './pages/Home';
import CreateCategory from './pages/Category/CreateCategory';
import AddMovies from './pages/Movies/AddMovie';
import MovieDetails from './pages/Movies/MovieDetails';
import Subscibe from './pages/SubScribe';



function App() {
  const [loginModal, setLoginModal] = useState();
  const dispatch = useDispatch()
  const { user } = useSelector(state => state)

  console.log(user)

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
      <div className="clone-sticker top-sticker text-white bg-primary px-5 py-2">Hotstart Clone</div>
      <Header openLogin={() => setLoginModal(!loginModal)} />
      <div className="main-container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/category" exact component={CreateCategory} />
          <Route path="/movie-details/:movieId" exact component={MovieDetails} />
          <Route path="/movie-details/:movieId/:episodeId" exact component={MovieDetails} />
          <Route path="/subscribe" exact component={Subscibe} />
          <Route path="/add-movie" exact component={AddMovies} />
        </Switch>
        <Footer/>
      </div>
      <Login show={loginModal} close={() => setLoginModal(!loginModal)} />
    </>
  );
}

export default App;
