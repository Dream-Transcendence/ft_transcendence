import { FormEvent } from 'react';

export interface LinkIconResource {
  url: string;
  icon: React.ReactElement;
  action?: () => void;
}

export interface LinkTextResource {
  content: string;
  handler?: () => void;
}

export interface LinkComponentResource {
  url: string;
  component: React.ReactElement;
}

export interface LinkIconProps {
  iconResource: {
    url: string;
    icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  };
  action?: () => void;
}

export interface CustomIconProps {
  icon: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  action?: () => void;
}

export interface CustomUploadProps {
  //jungjan님이 icon안쓸 수 있다고 하여 ? 처리
  icon?: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
  ref?: any;
  action: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
