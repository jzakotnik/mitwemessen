import React from 'react';
import { GetServerSideProps, NextPage } from 'next';
import { useRouter } from 'next/router';

// Import your components (adjust paths to your project)
import LunchProfileAdmin from '../lunchprofileadmin';
import LunchProfileRead from '../lunchprofileread';

import { LunchData } from "../../types/lunch";
import { PageData } from '../../types/page';


const defaultLunch: LunchData = {
  mon: true,
  tue: true,
  wed: true,
  thu: true,
  fri: true,
  lunchtopic: 50,
};

const Profile: NextPage<PageData> = (data) => {


  const router = useRouter();
  const { id } = router.query;
  const authId = Array.isArray(id) ? id[0] : id ?? '';

  const readOnly = !data.admin;

  if (!readOnly) {
    return (
      <LunchProfileAdmin
        lunchdata={data.lunchprofile ?? defaultLunch}
        authid={authId}
        readerid={data.public_id ?? ''}
      />
    );
  }

  return (
    <LunchProfileRead
      lunchdata={data.lunchprofile ?? defaultLunch}
      authid={authId}
    />
  );
};

export const getServerSideProps: GetServerSideProps<PageData> = async (context) => {

const defaultLunch: LunchData = {
  mon: true,
  tue: true,
  wed: true,
  thu: true,
  fri: true,
  lunchtopic: 50,
};
  const { id } = context.query;
  const idVal = Array.isArray(id) ? id[0] : id ?? '';

  try {
    const API = process.env.NEXT_PUBLIC_API_ENDPOINT;
    if (!API) {
      return { props: { admin: false, lunchprofile: defaultLunch } };
    }

    const res = await fetch(`${API}/api/getData?id=${encodeURIComponent(idVal)}`);
    if (!res.ok) {
      return { props: { admin: false, lunchprofile: defaultLunch } };
    }

    const data = (await res.json()) as PageData;
    return { props: data };
  } catch (e) {
    console.error('getServerSideProps error:', e);
    return { props: { admin: false, lunchprofile: defaultLunch } };
  }
};

export default Profile;
