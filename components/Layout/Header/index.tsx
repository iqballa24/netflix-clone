/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { AiOutlineLogout } from 'react-icons/ai';
import useAuth from '@/libs/hooks/useAuth';
import { menus } from '@/constant/menus';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const { logout, user } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <nav className="flex items-center space-x-2 sm:space-x-10">
        <img
          alt=""
          src="https://rb.gy/ulxxee"
          width={100}
          height={100}
          className="cursor-pointer object-contain"
        />
        <ul className="hidden space-x-4 sm:flex">
          {menus.map((menu) => (
            <li key={menu.id} className="headerLink">
              <Link href={menu.path}>{menu.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="flex items-center space-x-4 text-white font-light">
        <span>{user?.displayName || 'user'}</span>
        <button type="button" onClick={logout}>
          <AiOutlineLogout size={22} className="hover:text-red-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;
