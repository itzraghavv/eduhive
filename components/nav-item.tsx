import Link from "next/link";

interface NavItemProps {
  title: string;
}

export const NavItem = ({ title }: NavItemProps) => {
  return (
    <div>
      <Link href="/chat">{title}</Link>
    </div>
  );
};
