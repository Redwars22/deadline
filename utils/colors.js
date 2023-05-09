export const getBGFromPriorityLevel = (level) => {
  switch (level) {
    case 'normal':
      return '#fff';
    case 'warning':
      return '#fcd674';
    case 'urgent':
      return '#ff7878';
    default:
      return '#fff';
  }
};
