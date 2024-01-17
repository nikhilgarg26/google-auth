import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';

function App() {
  const [user, setUser] = useState([]);
  const [profile, setProfile] = useState(null);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {console.log(codeResponse); setUser(codeResponse)},
    onError: (error) => console.log('Login Failed:', error)
  });

  useEffect(

    () => {
      console.log(user)
      console.log(profile)
      if (user) {
        axios
          .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=ya29.a0AfB_byDHh411dLH0-hvpeZXbM0ALnxAzb9ZrRvx0s_uqzR22AfsF0RlN4-1sf3L6cGVL4qS1pC1N9bPgLKXehINWmmZyLUNbsA-5BkurP-Zta9dQ8KASePnPhiZPfW3qo4s6LuHMJtxbx5ZJ4FqBFTDm_4LeYTJCIQaCgYKARoSARMSFQHGX2Mi1urVxh9tykxE-sy63QaQaw0169`, {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: 'application/json'
            }
          })
          .then((res) => {
            setProfile(res.data);
          })
          .catch((err) => console.log(err));
      }
    },
    [user]
  );

  // log out function to log the user out of google and set the profile array to null
  const logOut = () => {
    googleLogout();
    setProfile(null);
  };

  return (
    <div>
      <h2>React Google Login</h2>
      <br />
      <br />
      {profile ? (
        <div>
          <img src={profile.picture} alt="user image" />
          <h3>User Logged in</h3>
          <p>Name: {profile.name}</p>
          <p>Email Address: {profile.email}</p>
          <br />
          <br />
          <button onClick={logOut}>Log out</button>
        </div>
      ) : (
        <button onClick={() => login()}>Sign in with Google 🚀 </button>
      )}
    </div>
  );
}
export default App;