export interface SearchPropsType {
  url: string;
  listParams: {
    value: number;
    setValue: React.Dispatch<React.SetStateAction<number>>;
  };
  type?: number;
  action?: () => void;
}
