'use client'
import { authClient } from '@/lib/auth-client';
import React from 'react';
import ProfileDropdown from './ProfileDropdown';
import Link from 'next/link';

const UserInfo = () => {

          const {data:session} = authClient.useSession()
          const user = session?.user
          console.log(user)
          return (
          <div>
          {
          user ? <div>
                    <ProfileDropdown
                    name={user?.name}
                    email={user?.email}
                    />
                    


                 </div> : <div className="flex shrink-0 items-center gap-1.5 sm:gap-3">
                         <Link href={'/sign-in'}><button
                            type="button"
                            className="rounded-lg border border-gray-300 px-2.5 py-2 text-xs font-semibold text-gray-800 transition-all duration-200 hover:border-[#05893E] hover:bg-green-50 hover:text-[#05893E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E] sm:border-2 sm:px-5 sm:text-sm cursor-pointer">
                            সাইন ইন
                         </button></Link>

                         <Link href={'/sign-up'}><button
                            type="button"
                            className="rounded-lg bg-[#05893E] px-2.5 py-2 text-xs font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#047a36] hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#05893E] sm:px-5 sm:text-sm cursor-pointer">
                            সাইন আপ
                         </button></Link>
                              </div>
          }   
                         
                    </div>
          );
};

export default UserInfo;
