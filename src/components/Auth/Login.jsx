import React, { useState } from "react";
import { useHistory } from 'react-router-dom'
import { auth, googleAuthProvider } from '../../firebase'
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from 'react-redux';
import { createOrderUpdateUser } from "../../constants/urls";

const Login = ({show, close }) => {
  const history = useHistory()
  const [ email, setEmail ] = useState("musavajahat@gmail.com")
  const [ password, setPassword ] = useState("Password@1")
  const dispatch = useDispatch()
 
  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(email, password)
    try{
        const result = await auth.signInWithEmailAndPassword(email,password)
        const { user } = result
        const tokenId = await user.getIdTokenResult()
        createOrderUpdateUser(tokenId.token)
        .then((res) => {
            dispatch({
                type:"LOGGED_IN_USER",
                payload:{
                    name:res.data.name,
                    email:res.data.email,
                    role:res.data.role,
                    _id:res.data._id,
                    token:tokenId.token
                }
            })
            close()
        })
        .catch((err) => console.log("Error", err))
    }catch(err){
        console.log(err.message)
    }
}

const googleLogin = () => {
    auth.signInWithPopup(googleAuthProvider).then(async (result) => {
        const { user } = result
        const tokenId = await user.getIdTokenResult()
        createOrderUpdateUser(tokenId.token)
        .then((res) => {
            dispatch({
                type:"LOGGED_IN_USER",
                payload:{
                    name:res.data.name,
                    email:res.data.email,
                    role:res.data.role,
                    _id:res.data._id,
                    token:tokenId.token
                }
            })
            close()
        })
        .catch((err) => console.log("Error", err))
        history.push('/')
    })
}

  return (
    <div>
      <Modal isOpen={show} toggle={close} centered size="sm" zIndex={999999}>
        <ModalHeader toggle={close}></ModalHeader>
        <ModalBody className="p-4 pb-5">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary custom-primary my-3 p-3 w-100">
              Login
            </button>
            <button
              type="button"
              className="btn btn-danger w-100 p-3"
              onClick={googleLogin}
            >
              Login with google
            </button>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default Login;
