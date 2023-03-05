import React from 'react';
import { useParams } from 'react-router-dom';

const Thanks = () => {
    const {submittedQuestionId} = useParams();
    return (
        <div className='container text-center vh-100 d-flex align-items-center justify-content-center'>
            <div className='text-center'>
                <h5>{submittedQuestionId}</h5>
            <h1 className='my-3 fw-bold'>Congratulations!</h1>
            <p>You have completed the History Form. Please move on to the next step in the testing process. Refer to your initial email for step-by-step instructions</p>

            <h6 className="form-label my-3">Email</h6>
            <div className="d-flex gap-2 w-25 mx-auto">
              <input  type="email" className="form-control" placeholder="Your Email" />
            </div>
            </div>
        </div>
    );
};

export default Thanks;