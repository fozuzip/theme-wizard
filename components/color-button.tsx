interface ColorButtonProps {
  hex: string;
  onClick?: (e: React.MouseEvent) => void;
}

export const ColorButton = ({ hex, onClick }: ColorButtonProps) => {
  return (
    <div className="flex items-center cursor-pointer ring-0" onClick={onClick}>
      <div
        className="flex h-6 w-6 items-center justify-center rounded-full ring-2 ring-offset-2 ring-offset-background"
        style={{ backgroundColor: hex }}
      />
    </div>
  );
};
