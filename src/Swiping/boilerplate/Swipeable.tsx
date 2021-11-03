import type { ProfileModel } from "./Profile";
import { Profile } from "./Profile";

interface SwiperProps {
  onSwipe: () => void;
  profile: ProfileModel;
  onTop: boolean;
}

export const Swipeable = ({ profile, onTop }: SwiperProps) => {
  return <Profile profile={profile} onTop={onTop} />;
};
