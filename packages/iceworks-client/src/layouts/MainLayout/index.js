import React, { useEffect, useState } from 'react';
import NavigationBar from '@components/NavigationBar';
import SubRoutes from '@components/SubRoutes';
import ConnectModal from '@components/ConnectModal';
import GlobalBar from '@components/GlobalBar';
import menuConfig from '@src/menuConfig';
import routerConfig from '@src/routerConfig';
import stores from '@stores';
import socket from '../../socket';
import appConfig from '../../appConfig';
import styles from './index.module.scss';

const MainLayout = () => {
  const [project, user] = stores.useStores(['project', 'user']);
  const [connect, setConnect] = useState(false);

  useEffect(() => {
    project.refresh();
  }, []);

  if (appConfig.isAliInternal) {
    user.refresh();
  }

  socket.on('connect', () => {
    setConnect(true);
  });

  socket.on('connect', () => {
    setConnect(true);
  });

  socket.on('disconnect', () => {
    setConnect(false);
  });

  async function onLogin(data) {
    await user.login(data);
  }

  return (
    <div className={styles.container}>
      <ConnectModal connect={connect} />
      <div className={styles.content}>
        <NavigationBar
          menuData={menuConfig}
          user={user.dataSource}
          onLogin={onLogin}
        />
        <div className={styles.main}>
          <SubRoutes routes={routerConfig} />
        </div>
      </div>
      <GlobalBar project={project} />
    </div>
  );
};

export default MainLayout;
