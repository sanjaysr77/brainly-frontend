import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSearchContent } from "../hooks/useSearchContent";

function UserSearch() {
  const [modalOpen, setModalOpen] = useState(false)
  const { contents, refresh } = useSearchContent();

  useEffect(() => {
    refresh()
  }, [modalOpen])

  useEffect(() => {
    const twttr = (window as any).twttr;
    if (twttr?.widgets?.load) {
      twttr.widgets.load();
    }
  }, [contents]);

  function handleDelete(contentId: string) {
    axios
      .delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId },
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then(() => {
        refresh(); // Refresh the content after deletion
      })
      .catch((err) => {
        console.error("Delete failed", err);
      });
  }

  return <div className="p-2 min-h-screen min-w-screen bg-gray-200">
    <Sidebar />
    <div className="ml-border-2">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />
      <div className="mt-8 ml-72 flex gap-3 pl-4 flex-wrap">
        {[...contents]
          .filter(item => item)
          .map(({ _id, type, link, title }) => (
            <Card
              key={_id}
              contentId={_id}
              type={type}
              link={link}
              title={title}
              onDelete={handleDelete}
            />
          ))}
      </div>
    </div>
  </div>

}
export default UserSearch;