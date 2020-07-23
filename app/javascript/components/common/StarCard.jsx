import React from "react";
import PropTypes from 'prop-types';
import StarImg from "../../../assets/images/illustrations/star.svg";

const StarCard = ({reviewsCount, whiteBg}) => {
    return (
        <div className="d-flex align-items-center flex-wrap">
            <ul className="list-inline mt-n1 mb-0 mr-2">
                <li className="list-inline-item mx-0">
                    <img src={StarImg} alt="Review rating" width="14"/>
                </li>
                <li className="list-inline-item mx-0">
                    <img src={StarImg} alt="Review rating" width="14"/>
                </li>
                <li className="list-inline-item mx-0">
                    <img src={StarImg} alt="Review rating" width="14"/>
                </li>
                <li className="list-inline-item mx-0">
                    <img src={StarImg} alt="Review rating" width="14"/>
                </li>
                <li className="list-inline-item mx-0">
                    <img src={StarImg} alt="Review rating" width="14"/>
                </li>
            </ul>
            <span className="d-inline-block ml-2">
                <small className={`font-weight-bold ${whiteBg ? 'text-white' : 'text-dark '} mr-1`}>4.95</small>
                <small className={whiteBg ? 'text-white-70' : 'text-muted'}>({reviewsCount} reviews)</small>
            </span>
        </div>
    )
}

StarCard.propTypes = {
    reviewsCount: PropTypes.number.isRequired,
    whiteBg: PropTypes.bool.isRequired,
};

export default StarCard;
