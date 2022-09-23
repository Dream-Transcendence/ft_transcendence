import { Button } from '@mui/material';

interface ButtonProps {
  content: string;
}

function TextButton({ content }: ButtonProps) {
  return <Button variant="contained">{content}</Button>;
}

export default TextButton;
