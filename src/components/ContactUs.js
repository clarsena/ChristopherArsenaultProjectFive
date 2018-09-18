import React from 'react';

//  RENDERS THE CONTACT US FORM TO THE PAGE AND SUBMISSION IS HANDLED THROUGH FOCUS POCUS
const ContactUs = () => {
    return (
        <section className='contactUsSection'>
            <h2>Contact Us Section</h2>
            <form action='http://www.focuspocus.io/magic/94413fafb7898c5f8fbc168fb8c76367' method='POST' className='contactUsForm'>
                <label htmlFor='contactName'>Name: </label>
                <input type='text' id='contactName' className='contactName' placeholder='Please enter your name...'/>
                <label htmlFor='contactEmail'>E-Mail: </label>
                <input type='text' id='contactEmail' className='contactEmail' placeholder='Please enter your email...'/>
                <label htmlFor='contactSubject'>Subject: </label>
                <input type='text' id='contactSubject' className='contactSubject' placeholder='Please enter the subject...'/>
                <label htmlFor='contactMessage'>Message: </label>
                <textarea id='contactMessage' className='contactMessage' rows='10' placeholder='Please enter your message...'/>
                <input type='submit' className='contactSubmit' value='Send Message'/>
            </form>
        </section>

    );
};

export default ContactUs;