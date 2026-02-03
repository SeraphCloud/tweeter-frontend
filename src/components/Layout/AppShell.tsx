import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { RightRail } from './RightRail';
import { MobileNav } from './MobileNav';
import * as S from './styles';

export function AppShell() {
  return (
    <>
      <S.AppShellContainer>
        <S.SidebarColumn>
          <Sidebar />
        </S.SidebarColumn>
        <S.MainColumn>
          <Outlet />
        </S.MainColumn>
        <S.RightRailColumn>
          <RightRail />
        </S.RightRailColumn>
      </S.AppShellContainer>
      <MobileNav />
    </>
  );
}
