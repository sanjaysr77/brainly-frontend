import { Button } from "./components/Button";
import { AddIcon } from "./icons/AddIcon";
import { ShareIcon } from "./icons/ShareIcon";
import { Card } from "./components/Card";
import { CreateContentModal } from "./components/CreateContentModal";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";

function App() {
  const [modalOpen, setModalOpen] = useState(false)
  return <div className =  "min-h-screen min-w-screen bg-gray-200">
    <Sidebar />
    <div className = "ml-border-2">
      <CreateContentModal open = {modalOpen} onClose = {() => {
        setModalOpen(false);
      }}/>
      <div className = "flex justify-end">
        <Button
          onClick = {() => {setModalOpen(true)}}
          variant="primary"
          text="Add Content"
          startIcon={<AddIcon />} />
        <Button
          variant="secondary"
          text="Share Brain"
          startIcon={<ShareIcon />} />
      </div>
      <div className = "ml-72 flex gap-3 pl-4">
        <Card
          type = "youtube"
          title = "Congress"
          link = "https://www.youtube.com/watch?v=hhBOJVQcllY&t=107s"
        />
        <Card
          type = "twitter"
          title = "ICT"
          link = "https://x.com/kollydrives/status/1942803528193593575"
        />
        
      </div>
    </div>
  </div>
  
}
export default App;