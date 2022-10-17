export interface SearchPropsType {
    url: string;
    prams: {
        id?: number;
        nickname: string;
    }
    fn: () => void;
    action: () => void;
  }