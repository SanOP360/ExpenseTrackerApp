import React, { useRef, useState, useEffect, useContext } from "react";
import "./Profile.css";
import AuthContext from "../store/AuthContext";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const nameInputRef = useRef();
  const photoInputRef = useRef();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    
    const fetchUserData = async () => {
      const idToken = ctx.idToken;

      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBOFTxkAWbMMSRNoWMlUi2BL2_lBXrV37A`, // Replace [API_KEY] with your API key
          {
            method: "POST",
            body: JSON.stringify({
              idToken,
            }),
            headers: {
              "Content-type": "application/json",
            },
          }
        );

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error?.message || "Failed to fetch user data");
        }

        const data = await response.json();
        const userData = data.users[0];

        nameInputRef.current.value = userData.displayName || "";
        photoInputRef.current.value = userData.photoUrl || "";
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [ctx.idToken]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredProfilePhotoUrl = photoInputRef.current.value;

    try {
      const idToken = ctx.idToken;

      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOFTxkAWbMMSRNoWMlUi2BL2_lBXrV37A", 
        {
          method: "POST",
          body: JSON.stringify({
            idToken,
            displayName: enteredName,
            photoUrl: enteredProfilePhotoUrl,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Failed to update profile");
      }

      console.log("Profile updated successfully!");
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="profileUpdataForm">
      <h1>Input the following field to update profile</h1>
      <div className="labelInput">
        <label htmlFor="Name">Full Name</label>
        <input type="text" ref={nameInputRef} />
      </div>

      <div className="labelInput">
        <label htmlFor="Photo">Profile Photo Url</label>
        <input type="url" ref={photoInputRef} />
      </div>

      <button onClick={submitHandler} disabled={isLoading}>
        {isLoading ? "Loading..." : "Update"}
      </button>


      
    </form>
  );
};

export default Profile;
