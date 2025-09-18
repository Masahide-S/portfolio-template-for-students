import { getSiteData } from '@/lib/dynamodb';
import { tagStyles } from '@/data/tagStyles';

// 親コンポーネントをインポート
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Knowledge from '@/components/Knowledge';
import Creations from '@/components/Creations';
import Connect from '@/components/Connect';
import Footer from '@/components/Footer';
import Timeline from '@/components/Timeline';
import Awards from '@/components/Awards';

export default async function Home() {
  const siteData = await getSiteData();
  if (!siteData) {
    return <div>サイトデータを読み込めませんでした。</div>;
  }

  const { header, profile, contact, skills, certifications, timeline, awards, research, products } = siteData;
  
  return (
    <>
    
      <Header navItems={header?.navItems || []} />
      <main>
        <Hero profile={profile || {}} contact={contact || {}} />
        
        {/* ▼▼▼ certificationsから.itemsを渡すように修正 ▼▼▼ */}
        <Knowledge skills={skills || {}} certifications={certifications?.items || []} />
        <Timeline timeline={timeline} profile={profile} tagStyles={tagStyles} />
        <Awards awardItems={awards} tagStyles={tagStyles} />
        <Creations 
          researchItems={research || []} 
          products={products || []} 
          tagStyles={tagStyles} 
        />
        <Connect contact={contact || {}} />
      </main>
      <Footer profile={profile || {}} header={header || {}} />
    </>
  );
}