'use server';
import { cookies } from 'next/headers';
import React from 'react'
interface CookiesStoreProps {
  user: object
}
const CookiesStore: React.FC<CookiesStoreProps> = async ({ user }) => {
    const cookieStore = await cookies();
    cookieStore.set('user', JSON.stringify(user));
  return <></>
}


export default CookiesStore;