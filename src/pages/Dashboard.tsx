import { Button } from "../components/Button";
import { AddIcon } from "../icons/AddIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { ShareIcon } from "../icons/ShareIcon";
import { SearchBar } from "../components/SearchBar";
import { SearchIcon } from "../icons/SearchIcon";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { contents, refresh } = useContent();
  const navigate = useNavigate()

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

  async function handleSearch(query: string) {
    try {
      console.log("Query: ", query);

      await axios.post(
        BACKEND_URL + "/api/v1/query",
        {
          query
        },
        {
          headers: {
            "Authorization": localStorage.getItem("token")
          }
          
        });

      navigate("/usersearch");
    } catch (error) {
      console.error("Search failed", error)
    }
  }

  return <div className="min-h-screen min-w-screen bg-gray-200">
    <div className="pl-72 flex justify-center">
      <SearchBar onSearch={handleSearch} startIcon={<SearchIcon />} placeholder="Search" />
    </div>
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
        {[...contents].reverse().map(({ _id, type, link, title }) => <Card
          key={_id}
          contentId={_id}
          type={type}
          link={link}
          title={title}
          onDelete={handleDelete}
        />
        )}
      </div>
    </div>
  </div>

}
export default Dashboard;