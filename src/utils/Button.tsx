import { Button } from '@/components/ui/button';

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  onClick: () => void;
  loading: boolean;
  text: string;
  loadingText: string;
}

export default function LoadingButton({
  onClick,
  loading,
  text,
  loadingText,
  ...props
}: LoadingButtonProps) {
  return (
    <Button onClick={onClick} disabled={loading} {...props}>
      {loading ? loadingText : text}
    </Button>
  );
}
