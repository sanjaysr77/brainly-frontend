import { Button } from "../components/Button";
import { AddIcon } from "../icons/AddIcon";
import { ShareIcon } from "../icons/ShareIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { contents, refresh } = useContent();

  useEffect(() => {
    refresh()
  }, [modalOpen])

  useEffect(() => {
  const twttr = (window as any).twttr;
  if (twttr?.widgets?.load) {
    twttr.widgets.load();
  }
}, [contents]);
 
  return <div className="min-h-screen min-w-screen bg-gray-200">
    <Sidebar />
    <div className="ml-border-2">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />
      <div className="flex justify-end">
        <Button
          onClick={() => { setModalOpen(true) }}
          variant="primary"
          text="Add Content"
          startIcon={<AddIcon />} />
        <Button
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />} />
      </div>
      <div className="ml-72 flex gap-3 pl-4 flex-wrap">
        {contents.map(({ type, link, title }) => <Card
          type={type}
          link={link}
          title={title} />
        )}
      </div>
    </div>
  </div>

}
export default Dashboard;