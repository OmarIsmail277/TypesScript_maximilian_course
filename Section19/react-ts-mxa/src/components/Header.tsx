interface HeaderProps {
  image: {
    src: string;
    alt: string;
  };
}

export default function Header({ image }: HeaderProps) {
  return (
    <header>
      <img {...image} />
    </header>
  );
}
