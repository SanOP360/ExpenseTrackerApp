import { useNavigate } from "react-router-dom";
import './Profile.css'

const Home=()=>{
    const navigate=useNavigate()
    return (
      <div className="Home">
        <h1>WELCOME TO Expense Tracker</h1>
        <section>
          <p>Your profile is only 60% completed.</p>
          <p>Click 
            <button className="HereBtn" onClick={()=>{navigate('/Profile')}}>Here</button>
            to complete it
          </p>
        </section>
      </div>
    );
}
export default Home;