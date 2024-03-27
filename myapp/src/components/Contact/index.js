
import './index.css'

const Contact = () => (
    <div className="contact-container">
        <h1 className="contact">Contact Us</h1>
        <form className="form-container">
            <div className="input-container">
                <label htmlFor="name">Full Name</label>
                <br/>
                <input placeholder="Enter Name here..." id="name" type="text"/>
            </div>
            <div className="input-container">
                <label htmlFor="email">E-mail</label>
                <br/>
                <input placeholder="Enter E-mail here..." id="email" type="text"/>
            </div>
            <div className="input-container">
                <label htmlFor="phone">Phone No</label>
                <br/>
                <input placeholder="Enter Phone no here..." id="phone" type="text"/>
            </div>
            <div>
            <textarea placeholder="Convey anything from here..." rows="8" cols="35">
            </textarea>
            </div>
            <button className="submit-btn" submit="button">Submit</button>      
        </form>
    </div>

)

export default Contact