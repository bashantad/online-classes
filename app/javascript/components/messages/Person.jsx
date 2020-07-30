import React from "react";
import PropTypes from "prop-types";
import MessageNotification from "./MessageNotification";

const Person = ({activeClass, imageUrl, fullName, noOfMessages, handleUserClick}) => {
    return (
        <div className={activeClass ? "list-group people aside-active" : "list-group people"}>
            <a type='button' className="ml-2 mr-2 p-2"
               onClick={handleUserClick}>
                <div className="p-2 row align-items-center">
                    <div className="col-2">
                            <span>
                            {
                                imageUrl ?
                                    <img className="avatar-img" src={imageUrl} alt="Profile picture"/>
                                    : <i className="fas fa-user-circle fa-2x list-group-icon mr-4"></i>
                            }
                        </span>
                    </div>
                    <div className="col-10">
                        <span className='mt-2 text-dark'>{fullName}</span>
                        <MessageNotification noOfMessages={noOfMessages} />
                    </div>
                </div>
            </a>
        </div>
    )
}

Person.propTypes = {
    activeClass: PropTypes.bool.isRequired,
    fullName: PropTypes.string.isRequired,
    noOfMessages: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    handleUserClick: PropTypes.func.isRequired,
}

export default Person;
