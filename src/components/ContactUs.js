import React from 'react';

const ContactUs = () => {
    return (
        <section className="contactUsSection">
            <h2>Contact Us Section</h2>
            <form action="" className="contactUsForm">
                <label htmlFor="contactName" className="visuallyhidden">Name: </label>
                <input type="text" id="contactName" className="contactName" placeholder="Please enter your name..."/>
                <label htmlFor="contactEmail" className="visuallyhidden">E-Mail: </label>
                <input type="text" id="contactEmail" className="contactEmail" placeholder="Please enter your email..."/>
                <label htmlFor="contactMessage" className="visuallyhidden">Message: </label>
                <textarea id="contactMessage" className="contactMessage" rows="10" placeholder="Please enter your message..."/>
                <input type="submit" className="contactSubmit" value="Send Message"/>
            </form>
        </section>

    );
};

export default ContactUs;