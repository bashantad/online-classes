import React from "react";
import PropTypes from "prop-types";
import avatarImg from "../../../assets/images/components/160x160/img1.jpg";

const Avatar = ({imageUrl}) => {
    const avatar = imageUrl || avatarImg;
    return (
      <div className="avatar avatar-circle mr-3">
          <img className="avatar-img" src={avatar} />
      </div>
    )
};

Avatar.propTypes = {
    imageUrl: PropTypes.string,
}

export default Avatar;
