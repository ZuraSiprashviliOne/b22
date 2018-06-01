export function getPageSlag(path){

  return path === '/' ? 'home_page' : path.split('/')[1];
}