import CreateGameForm from "@/components/CreateGameForm"
import PageTransition from "@/components/PageTransition"

function CreateGamePage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <CreateGameForm />
      </div>
    </PageTransition>
  )
}

export default CreateGamePage
