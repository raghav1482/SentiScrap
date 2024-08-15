import React from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import './SignIn.css'; // Import the CSS file
import { FcGoogle } from 'react-icons/fc'; // Import the Google icon

export default function SignIn({ isOpen, toggle, onSignIn }) {
    return (
        <Modal isOpen={isOpen} toggle={toggle} className="signin-modal" centered>
            <ModalHeader toggle={toggle} className="signin-modal-header"></ModalHeader>
            <ModalBody className="signin-modal-body">
                <div className="signin-content">
                    <img 
                        src="https://randomuser.me/api/portraits/lego/1.jpg" 
                        alt="Profile" 
                        className="mock-profile-pic" 
                    />
                    <h5 className="signin-title">Please sign in</h5>
                    <Button onClick={onSignIn} block className="signin-button">
                        <FcGoogle className="google-icon mx-3" />
                        Sign in with Google
                    </Button>
                </div>
            </ModalBody>
        </Modal>
    );
}
