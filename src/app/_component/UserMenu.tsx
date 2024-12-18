
// // import { auth, signOut } from '@/auth'
// import { Avatar, button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
// import { Session } from 'next-auth'
// import Link from 'next/link'
// import React from 'react'
// import { UserSignOut } from '../actions/authActions'


// type Props = {
//     user: Session['user'] | null
// }
// export default function UserMenu({ user }: Props) {
//     async function deleteCokkies() {
//         await UserSignOut()

//     }
//     return (
//         <Dropdown placement='bottom-end'>
//             <DropdownTrigger>
//                 <Avatar
//                     isBordered
//                     as='button'
//                     className='transition-transform'
//                     color='secondary'
//                     size='sm'
//                     name={user?.name || 'user avatar'}
//                     src={user?.image || '/images/user.png'}
//                 />
//             </DropdownTrigger>
//             <DropdownMenu variant='flat' aria-label='User actions menu'>
//                 <DropdownSection showDivider>
//                     <DropdownItem isReadOnly as='span' className='h-14 flex flex-row' aria-label='username'>
//                         Signed in as {user?.name}
//                     </DropdownItem>
//                     <DropdownItem as={Link} href='members/edit'>
//                         Edit Profile
//                     </DropdownItem>
//                     {/* {
//                         user ? <DropdownItem as={button} onClick={() => {
//                             deleteCokkies()
//                         }}>
//                             Sign Out
//                         </DropdownItem> : ""
//                     } */}

//                 </DropdownSection>
//             </DropdownMenu>
//         </Dropdown>
//     )
// }

import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react';
import { Session } from 'next-auth';
import Link from 'next/link';
import React from 'react';
import { UserSignOut } from '../actions/authActions';
import NavLink from './NavLink';

type Props = {
  user: Session['user'] ;
};

export default function UserMenu({ user }: Props) {
  async function deleteCokkies() {
    await UserSignOut();
    // Optionally redirect after sign-out
    window.location.href = '/';
  }

  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          isBordered
          as="button"
          className="transition-transform"
          color="secondary"
          size="sm"
          name={user?.name || 'user avatar'}
          src={user?.image || '/images/user.png'}
        />
      </DropdownTrigger>
      <DropdownMenu variant="flat" aria-label="User actions menu">
        <DropdownSection showDivider>
          <DropdownItem isReadOnly as="span" className="h-14 flex flex-row" aria-label="username">
            Signed in as {user?.name}
          </DropdownItem>

        </DropdownSection>
        <DropdownItem>
            <Link href="/members/edit">
            Edit Profile
            </Link>
          </DropdownItem>
          <DropdownItem>
            <Link href="/logout" >
              Sign Out
            </Link>
          </DropdownItem>
          
      </DropdownMenu>
    </Dropdown>
  );
}
