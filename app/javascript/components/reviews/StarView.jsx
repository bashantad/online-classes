import React from "react";
import PropTypes from "prop-types";

const StarView = ({noOfStars}) => {
    return (
        <ul className="list-inline mb-2 text-warning">
            {
                [...Array(noOfStars).keys()].map(index => (
                        <li className="list-inline-item mx-0" key={`review-star-item-${index}`}>
                            <i className='fa fa-star'></i>
                        </li>
                    )
                )
            }
        </ul>
    );
}

StarView.propTypes = {
    noOfStars: PropTypes.number.isRequired,
}

export default StarView;
