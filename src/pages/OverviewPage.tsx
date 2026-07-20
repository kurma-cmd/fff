import { useState } from 'react';
import type { StudentProfile } from '../App';
import type { PageName } from '../components/Dashboard';
import { NextAdmissionStep } from '../components/NextAdmissionStep';
import { OpportunityList } from '../components/OpportunityList';
import { OverviewActions } from '../components/OverviewActions';
import { OverviewHero } from '../components/OverviewHero';
import { ProfileInsights } from '../components/ProfileInsights';
import { WeeklyPlan } from '../components/WeeklyPlan';
import { GettingStartedGuide } from '../components/GettingStartedGuide';


export function OverviewPage({ profile, goTo }: { profile: StudentProfile; goTo: (page: PageName) => void }) {
  const [showMore, setShowMore] = useState(false);
  return <div className="dashboard premium-dashboard"><OverviewHero profile={profile} goTo={goTo} /><GettingStartedGuide goTo={goTo} /><OverviewActions goTo={goTo} /><section className="overview-section-heading plan-heading"><div><p className="eyebrow">Персональный ритм</p><h2>План, который двигает вперёд</h2></div><p>Небольшие действия складываются в готовую заявку.</p></section><WeeklyPlan profile={profile} goTo={goTo} /><NextAdmissionStep profile={profile} goTo={goTo} /><button className="section-reveal overview-reveal" onClick={() => setShowMore(value => !value)}><span><b>Ещё о твоём маршруте</b><small>Профиль, возможности и дополнительные рекомендации</small></span><strong>{showMore ? 'Скрыть ↑' : 'Показать больше ↓'}</strong></button>{showMore && <div className="revealed-section"><ProfileInsights profile={profile} /><OpportunityList /></div>}</div>;
}

