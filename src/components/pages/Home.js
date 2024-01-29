import { useNavigate } from "react-router-dom";
import './Profile.css'

const Home=()=>{
    const navigate=useNavigate()
    return (
      <div className="Home">
        <h1>WELCOME TO Expense Tracker</h1>
        <section>
          <p>To Update or Complete your Profile!</p>
          <p>Click 
            <button className="HereBtn" onClick={()=>{navigate('/Profile')}}>Here</button>
            
          </p>
        </section>
      </div>
    );
}
export default Home;