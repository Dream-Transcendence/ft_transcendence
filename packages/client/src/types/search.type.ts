import { BaseUserProfileData } from "./Profile.type";

export interface SearchPropsType {
  url: string;
  listParams: {
    value: BaseUserProfileData;
    setValue: React.Dispatch<React.SetStateAction<BaseUserProfileData>>;
  };
  type?: number;
  action?: () => void;
}
