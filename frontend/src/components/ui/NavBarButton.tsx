import type { LucideProps } from 'lucide-react';

type NavBarButtonProps = {
  icon?: (props: LucideProps) => any; //JSX.Element
  text: string;
  onClick?: () => void;
};

const NavBarButton = ({ icon: Icon, text, onClick }: NavBarButtonProps) => {
  return (
    <div className='ml-3 mt-1 mb-1 hover:bg-blue-100 w-full p-2'>
      <button onClick={onClick} className={`flex items-center gap-2 font-sans`}>
        {Icon && <Icon className="inline" size={17} />}
        <span>{text}</span>
      </button>
    </div>
  );
};

export default NavBarButton;
