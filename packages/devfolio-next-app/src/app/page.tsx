import Image from 'next/image';

// import { Wrapper } from 'ui-components';
import { Text } from 'ui-components';
import classes from './styles.module.css';
import WorkExperience from './components/WorkExperience';
import TechStack from './components/TechStack';
import Projects from './components/Projects';
import Contact from './components/Contact';

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
      <div className='body'>
        <div id='home' className='hero'>
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
                <div className='me-name-wrapper'>
                  <Text font='Preahvihear'>
                    Hello! I Am{' '}
                    <span className='text-violet-300'>Akhil</span>
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
        <WorkExperience />
        <TechStack />
        <Projects />
        <Contact />
      </div>
    </div>
  );
}

