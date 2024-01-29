import React, { useRef, useState } from "react";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const nameInputRef = useRef();
  const photoInputRef = useRef();

  const submitHandler = async (e) => {
    e.preventDefault();
    const enteredName = nameInputRef.current.value;
    const enteredProfilePhotoUrl = photoInputRef.current.value;

    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBOFTxkAWbMMSRNoWMlUi2BL2_lBXrV37A", // Replace with your API key
        {
          method: "POST",
          body: JSON.stringify({
            displayName: enteredName,
            photoUrl: enteredProfilePhotoUrl,
            returnSecureToken: true,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error?.message || "Authentication failed");
      }

      const data = await response.json();
      console.log(data.idToken);
      console.log(data.photoUrl);
      console.log(data.displayName);
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form>
      <label htmlFor="Name">Full Name</label>
      <input type="text" ref={nameInputRef} />

      <label htmlFor="Photo">Profile Photo Url</label>
      <input type="url" ref={photoInputRef} />

      <button onClick={submitHandler}>Update</button>
    </form>
  );
};

export default Profile;
