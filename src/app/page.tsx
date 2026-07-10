import { getSiteData } from '@/lib/dynamodb';
import { tagStyles } from '@/data/tagStyles';
import ErrorFallback from '@/components/ErrorFallback';

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
  let siteData;

  try {
    siteData = await getSiteData();
  } catch (error) {
    return <ErrorFallback error={error instanceof Error ? error : null} />;
  }

  if (!siteData) {
    return <ErrorFallback message="サイトデータを読み込めませんでした" />;
  }

  const { header, profile, contact, skills, certifications, timeline, awards, research, products } = siteData;

  return (
    <>
      <Header navItems={header?.navItems || []} />
      <main>
        <Hero profile={profile} contact={contact} />
        <Knowledge
          skills={skills || { categories: [] }}
          certifications={certifications?.items || []}
        />
        <Timeline
          timeline={timeline || []}
          profile={profile}
          tagStyles={tagStyles}
        />
        <Awards awardItems={awards || []} tagStyles={tagStyles} />
        <Creations
          researchItems={research || []}
          products={products || []}
          tagStyles={tagStyles}
        />
        <Connect contact={contact} />
      </main>
      <Footer profile={profile} header={header} />
    </>
  );
}