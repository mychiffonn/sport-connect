import PageTransition from "@/components/PageTransition"

export function ProfilePage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-4 text-3xl font-bold">Your Profile</h1>
        <p>Profile settings will appear here.</p>
      </div>
    </PageTransition>
  )
}

export default ProfilePage
