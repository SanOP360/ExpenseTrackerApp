import React,{useState,useRef} from 'react'
import classes from "./AuthForm.module.css";
const AuthForm=()=>{

     const [isLoading, setIsLoading] = useState(false);
     const emailInputRef = useRef();
     const passwordInputRef = useRef();

     const submitHandler = async (event) => {
       event.preventDefault();
       const enteredEmail = emailInputRef.current.value;
       const enteredPassword = passwordInputRef.current.value;
       setIsLoading(true);

    

       try {
         const response = await fetch(
           "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBOFTxkAWbMMSRNoWMlUi2BL2_lBXrV37A",
           {
             method: "POST",
             body: JSON.stringify({
               email: enteredEmail,
               password: enteredPassword,
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
         console.log('successfully created an account');
         
        
       } catch (err) {
         alert(err.message);
       } finally {
         setIsLoading(false);
       }

        emailInputRef.current.value = "";
        passwordInputRef.current.value = "";



       
     };


    return (
      <section className={classes.auth}>
        <h1>Login</h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input type="email" id="email" required ref={emailInputRef} />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              type="password"
              id="password"
              required
              ref={passwordInputRef}
            />
          </div>
          <div className={classes.actions}>
            {!isLoading && <button>SignUp</button>}
            {isLoading && <p>Loading...</p>}
          </div>
        </form>
      </section>
    );
    
}

export default AuthForm