import { logout } from '~/guard/guard.server';

export const loader = async ({ request }) => {
  return logout(request).then((e)=>{
    return e;
  });
};


export default function Logout() {
}