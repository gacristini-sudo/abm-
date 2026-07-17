import { PageHeader } from "@/components/shared/page-header";
import { SectionCard } from "@/components/shared/section-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { ProfileForm } from "@/components/features/settings/profile-form";
import { TeamSection } from "@/components/features/settings/team-section";
import { IntegrationsSection } from "@/components/features/settings/integrations-section";
import { NotificationsSection } from "@/components/features/settings/notifications-section";
import { AppearanceSection } from "@/components/features/settings/appearance-section";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader title="Settings" description="Manage your profile, team, integrations, and preferences" />

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <SectionCard title="Profile" description="Your personal account information">
            <ProfileForm />
          </SectionCard>
        </TabsContent>

        <TabsContent value="team">
          <SectionCard title="Team Members" description="Everyone with access to this workspace">
            <TeamSection />
          </SectionCard>
        </TabsContent>

        <TabsContent value="integrations">
          <SectionCard title="Integrations" description="Connect your data sources and revenue tools">
            <IntegrationsSection />
          </SectionCard>
        </TabsContent>

        <TabsContent value="notifications">
          <SectionCard title="Notifications" description="Choose what you want to be notified about">
            <NotificationsSection />
          </SectionCard>
        </TabsContent>

        <TabsContent value="appearance">
          <SectionCard title="Appearance" description="Customize the look and feel">
            <AppearanceSection />
          </SectionCard>
        </TabsContent>
      </Tabs>
    </div>
  );
}
