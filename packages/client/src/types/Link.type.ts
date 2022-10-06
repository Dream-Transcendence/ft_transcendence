export interface LinkIconResource {
  url: string;
  icon: React.ReactElement;
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
