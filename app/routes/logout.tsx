import { logout } from '~/guard/guard';

export const loader = async ({ request }) => {
  return logout(request).then((e)=>{
    return e;
  });
};


export default function Logout() {
}