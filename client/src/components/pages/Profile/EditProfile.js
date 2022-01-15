import React, { useEffect, useState } from "react";

import "./EditProfile.css";

import "../../../utilities.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import {get, post} from "../../../utilities.js";

const EditProfile = (props) => {

    return (
        <div>
            <Popup
                trigger={<button className="EditProfile-button"> Edit Profile </button>}
                modal
                nested
            >
                {close => (
                <div className="EditProfile-background">
                    <button className="EditProfile-close" onClick={close}>
                    &times;
                    </button>
                    <div className="EditProfile-header"> Edit Profile </div>
                    <div className="EditProfile-content">
                    {' '}
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque, a nostrum.
                    Dolorem, repellat quidem ut, minima sint vel eveniet quibusdam voluptates
                    delectus doloremque, explicabo tempore dicta adipisci fugit amet dignissimos?
                    <br />
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Consequatur sit
                    commodi beatae optio voluptatum sed eius cumque, delectus saepe repudiandae
                    explicabo nemo nam libero ad, doloribus, voluptas rem alias. Vitae?
                    </div>
                    <div className="EditProfile-actions">
                    <Popup
                        trigger={<button className="EditProfile-button"> Trigger </button>}
                        position="top center"
                        nested
                    >
                        <span>
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
                        magni omnis delectus nemo, maxime molestiae dolorem numquam
                        mollitia, voluptate ea, accusamus excepturi deleniti ratione
                        sapiente! Laudantium, aperiam doloribus. Odit, aut.
                        </span>
                    </Popup>
                    <button
                        className="EditProfile-button"
                        onClick={() => {
                        console.log('modal closed');
                        close();
                        }}
                    >
                        Return to Profile
                    </button>
                    </div>
                </div>
                )}
            </Popup>
        </div>
    );
};

export default EditProfile;