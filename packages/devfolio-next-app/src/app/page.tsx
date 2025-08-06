// import { Wrapper } from 'ui-components';
import Image from 'next/image';
import classes from './styles.module.css';

export default function Home() {
  // return (
  //   <Wrapper classNames='flex justify-center'>
  //     <h1 className='bg-gradient-to-r from-amber-600 to-red-600 inline-block text-transparent bg-clip-text text-6xl'>
  //       Devfolio
  //     </h1>
  //   </Wrapper>
  // );
  return (
    <div className='main-container'>
      <div
        className={`header bg-indigo-950 shadow-header-shadow ${classes.header} h-[55px]`}>
        <div className='wrapper flex p-[10px]'>
          <div className='logo-container flex-1 flex justify-center'>
            <div className={`logo-wrapper relative w-7 h-7 md:w-8 md:h-8`}>
              <Image src='/logo.svg' alt='Logo' fill />
            </div>
          </div>
          <div className='nav-container flex-1 pr-10 flex justify-center items-center'>
            <div className='nav-wrapper'>
              <ul className='flex gap-6 text-[13px] md:text-[15px] md:gap-20'>
                <li>Home</li>
                <li>About</li>
                <li>Lab</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

