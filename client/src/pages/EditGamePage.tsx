import EditGameForm from "@/components/EditGameForm"
import PageTransition from "@/components/PageTransition"

function EditGamePage() {
  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <EditGameForm />
      </div>
    </PageTransition>
  )
}
export default EditGamePage
