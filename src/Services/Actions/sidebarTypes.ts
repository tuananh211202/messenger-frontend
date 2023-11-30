export interface SidebarState {
  onNoti: boolean;
  onSearch: boolean;
  onCreate: boolean;
};

export type SidebarAction = 
  | { type: 'OPEN_NOTI' }
  | { type: 'OPEN_SEARCH' }
  | { type: 'OPEN_CREATE_MODAL' }
  | { type: 'CLOSE_NOTI' }
  | { type: 'CLOSE_SEARCH' }
  | { type: 'CLOSE_CREATE_MODAL' }
  | { type: 'NAVIGATE' }
  | { type: 'DEFAULT' } ;
  