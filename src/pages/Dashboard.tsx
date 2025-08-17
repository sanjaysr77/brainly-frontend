import { Button } from "../components/Button";
import { AddIcon } from "../icons/AddIcon";
import { Card } from "../components/Card";
import { CreateContentModal } from "../components/CreateContentModal";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/Sidebar";
import { useContent } from "../hooks/useContent";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { SearchBar } from "../components/SearchBar";
import { SearchIcon } from "../icons/SearchIcon";
import { useNavigate } from "react-router-dom";
import { LogoutIcon } from "../icons/LogoutIcon";
import { useAuthContext } from "../components/AuthProvider";
import { getAuthHeaders } from "../utils/firebaseAuth";

function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { contents, refresh } = useContent();
  const navigate = useNavigate()
  const { user, signOut } = useAuthContext()

  useEffect(() => {
    refresh()
  }, [modalOpen])

  useEffect(() => {
    const twttr = (window as any).twttr;
    if (twttr?.widgets?.load) {
      twttr.widgets.load();
    }
  }, [contents]);

  async function handleDelete(contentId: string) {
    try {
      const headers = await getAuthHeaders();
      await axios.delete(`${BACKEND_URL}/api/v1/content`, {
        data: { contentId },
        headers,
      });
      refresh(); // Refresh the content after deletion
    } catch (err) {
      console.error("Delete failed", err);
    }
  }

  async function handleSearch(query: string) {
    try {
      console.log("Query: ", query);
      const headers = await getAuthHeaders();
      await axios.post(
        BACKEND_URL + "/api/v1/query",
        { query },
        { headers }
      );
      navigate("/usersearch");
    } catch (error) {
      console.error("Search failed", error)
    }
  }

  async function handleLogout() {
    try {
      await signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Logout failed", error);
    }
  }

  return <div className="min-h-screen min-w-screen bg-gray-200">
    <Sidebar />
    <div className="ml-border-2">
      <CreateContentModal open={modalOpen} onClose={() => {
        setModalOpen(false);
      }} />
      
      {/* Header with user info and logout */}
      <div className="flex justify-between items-center p-4 ml-72">
        <div className="flex items-center space-x-4">
          <div className="text-lg font-semibold">
            Welcome, {user?.displayName || user?.email || 'User'}!
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <SearchBar onSearch={handleSearch} startIcon={<SearchIcon />} placeholder="Search" />
          <Button
            onClick={() => { setModalOpen(true) }}
            variant="primary"
            text="Add Content"
            startIcon={<AddIcon />} />
          <Button
            onClick={handleLogout}
            variant="secondary"
            text="Logout"
            startIcon={<LogoutIcon />} />
        </div>
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