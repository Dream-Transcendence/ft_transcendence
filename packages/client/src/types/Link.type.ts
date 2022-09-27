export interface LinkIconResource {
  url: string;
  icon: React.ReactElement;
}

export interface LinkTextResource {
  url: string;
  content: string;
  handler?: () => void;
}

export interface LinkComponentResource {
  url: string;
  component: React.ReactElement;
}