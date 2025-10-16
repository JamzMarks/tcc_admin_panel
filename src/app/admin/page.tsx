
'use client'
import { useUser } from '@/context/user-context';
import {useTranslations} from 'next-intl'; 

const Dashboard = () => {
  const {user } = useUser()
  const t = useTranslations('HomePage');
  return (
      <section>
        <h1>{t('title')}</h1>
        <div><p>a</p></div>
        {Array.from({ length: 1 }).map((_, i) => (
          <p key={i} className="w-full h-60">Item {i + 1}</p>
        ))}
      </section>
  );
}

export default Dashboard;
