import React, { useRef, useState, useEffect, useContext } from "react";
import "./Profile.css";
import AuthContext from "../store/AuthContext";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");
    const [email, setEmail] = useState("");

  const nameInputRef = useRef();
  const photoInputRef = useRef();
  const ctx = useContext(AuthContext);

  useEffect(() => {
    const fetchUserData = async () => {
      const idToken = ctx.idToken;

      try {
        const response = await fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBOFTxkAWbMMSRNoWMlUi2BL2_lBXrV37A`,
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

        setName(userData.displayName || "");
        setImg(userData.photoUrl || "");
        setEmail(userData.email || "");
      } catch (err) {
        alert(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [ctx.idToken]);

  const sendVerificationEmail = async () => {
    const idToken = ctx.idToken;

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyBOFTxkAWbMMSRNoWMlUi2BL2_lBXrV37A`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "VERIFY_EMAIL",
            idToken,
          }),
          headers: {
            "Content-type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        console.error("Error sending verification email:", data.error);
        if (data.error?.message === "TOO_MANY_ATTEMPTS_TRY_LATER") {
          console.log("Retrying after delay...");
          await new Promise((resolve) => setTimeout(resolve, 5000));
          sendVerificationEmail();
        } else {
          throw new Error(
            data.error?.message || "Failed to send verification email"
          );
        }
      }

      console.log("Verification email sent successfully!");
    } catch (err) {
      alert(err.message);
    }
  };

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
      sendVerificationEmail();
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form className="profileUpdateForm">
        <h1>Input the following field to update profile</h1>
        <div className="labelInput">
          <label htmlFor="Name">Full Name</label>
          <input type="text" ref={nameInputRef} />
        </div>

        <div className="labelInput">
          <label htmlFor="Photo">Profile Photo Url</label>
          <input type="url" ref={photoInputRef} />
        </div>
        <div className="buttonUpdate">
          <button onClick={submitHandler} disabled={isLoading}>
            {isLoading ? "Loading..." : "Update"}
          </button>
        </div>
      </form>

      <section className="details">
        <ul>
          <li className="detailList">{name}</li>
          <li className="profImg">
            <img src={img} alt="" />
          </li>
          <li>{email}</li>
        </ul>

        <div className="buttonVerifyEmail">
          <button
            type="button"
            onClick={sendVerificationEmail}
            disabled={isLoading}
          >
            Verify Email
          </button>
        </div>
      </section>
    </>
  );
};

export default Profile;
