import React from "react";

import Profile, { ProfileModel } from "./Profile";

interface SwiperProps {
  onSwipe: () => void;
  profile: ProfileModel;
  onTop: boolean;
}

const Swiper = ({ profile, onTop }: SwiperProps) => {
  return <Profile profile={profile} onTop={onTop} />;
};

export default Swiper;
