import Image from 'next/image';

// import { Wrapper } from 'ui-components';
import { Text } from 'ui-components';
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
              <Image src='/logo.svg' alt='Logo' fill priority={true} />
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
      <div className='body'>
        <div className='hero'>
          <div className='me-image-section flex justify-center relative'>
            <div
              className={`${classes['image-wrapper']} h-[371px] w-[255px] flex justify-center items-center`}>
              <div
                className={`me-image-container relative h-[169px] w-[168px] md:h-[259px] md:w-[258px]`}>
                <Image src='/me@3x.png' alt='me' fill className='z-20' />
              </div>
            </div>
            <div className='me-name-section flex absolute top-7 right-9'>
              <div className='me-arrow-container p-1.5'>
                <div className='me-arrow-wrapper relative h-[50px] w-[60px] translate-y-[10px]'>
                  <Image src='/arrow@3x.png' alt='arrow' fill />
                </div>
              </div>
              <div className='me-name-container'>
                <div className='me-name-wrapper text-test-color'>
                  <Text font='Preahvihear' classNames='text-test-color'>
                    Hello! I Am{' '}
                    <span className='text-nights-mantle text-test-color'>Akhil</span>
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

