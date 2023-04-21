import { menus } from '@/constant/menus';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const BottomBar = () => {
  const router = useRouter();

  return (
    <nav className="fixed sm:hidden bg-[#141414] w-full left-0 bottom-0 z-10">
      <ul className="flex justify-around">
        {menus.map((menu) => (
          <li
            key={menu.id}
            className={`py-3.5 headerLink ${
              router.asPath === menu.path ? 'text-red-400' : ''
            }`}
          >
            <Link href={menu.path}>
              <menu.icon size={20} />
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomBar;
