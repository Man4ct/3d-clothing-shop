import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import {
  CustomButton,
  AIPicker,
  ColorPicker,
  FilePicker,
  Tab,
} from '../components';
import config from '../config/config';
import { download } from '../assets';
import { downloadCanvasToImage, reader } from '../config/helpers';
import { EditorTabs, FilterTabs, DecalTypes } from '../config/constants';
import { fadeAnimation, slideAnimation } from '../config/motion';
import state from '../store';

const Customizer = () => {
  const snap = useSnapshot(state);

  const [file, setFile] = useState('');

  const [activeEditorTab, setActiveEditorTab] = useState('');
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });
  //show tab content depending on the activeTab
  const generateTabContent = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'file':
        return <FilePicker />;
      default:
        return null;
    }
  };
  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div
            key='custom'
            className='top-0 left-0 z-10 absolute'
            {...slideAnimation('left')}
          >
            <div className='flex items-center min-h-screen'>
              <div className='editortabs-container tabs'>
                {EditorTabs.map((tab) => (
                  <Tab
                    key={tab.name}
                    tab={tab}
                    handleClick={() => setActiveEditorTab(tab.name)}
                  />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>
          <motion.div
            className='absolute z-10 top-5 right-5'
            {...fadeAnimation}
          >
            <CustomButton
              type='filled'
              title='Go Back'
              handleClick={() => (state.intro = true)}
              customStyle='w-fit py-2.5 px-4 font-bold text-sm'
            />
          </motion.div>
          <motion.div
            className='filtertabs-container'
            {...slideAnimation('up')}
          >
            {FilterTabs.map((tab) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab=''
                handleClick={() => {}}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
export default Customizer;
