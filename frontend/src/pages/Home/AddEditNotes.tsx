import { useEffect, useState } from "react";
import TagInput from "../../components/Input/TagInput";
import { MdClose } from "react-icons/md";
import axiosInstance from "../../utilis/axiosInstance";

interface Note {
  _id: number;
  title: string;
  createdOn: string;
  content: string;
  tags: string[];
  isPinned: boolean;
}
interface AddEditNotesProps {
  noteData: Note | null;
  type: string;
  onClose: () => void;
  AllNote: () => void;
  showToastMessage: (message: string, type: string) => void;
}
const AddEditNotes: React.FC<AddEditNotesProps> = ({
  noteData,
  type,
  onClose,
  AllNote,
  showToastMessage,
}) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");

  const [tags, setTags] = useState<string[]>(noteData?.tags || []);
  const [error, setError] = useState("");

  useEffect(() => {});
  //Add note
  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });
      if (response.data?.note) {
        onClose();
        showToastMessage("Added", "add");
        AllNote();
      }
    } catch (err) {
      console.log(`Unexpected error occured ${err}`);
    }
  };

  //Edit Note
  const editNote = async () => {
    if (noteData) {
      const noteID = noteData._id;
      try {
        const response = await axiosInstance.put(`/edit-note/` + noteID, {
          title,
          content,
          tags,
        });
        if (response.data?.note) {
          onClose();
          showToastMessage("Updated", "edit");
          AllNote();
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }

    setError("");
    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative p-4 sm:p-6 md:p-8 lg:p-10">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-200 md:w-12 md:h-12"
        onClick={() => {
          onClose();
        }}
      >
        <MdClose className="text-xl text-slate-400 md:text-2xl" />
      </button>
      <div className="flex flex-col gap-4">
        <label className="text-sm font-semibold text-gray-700">TITLE</label>
        <input
          type="text"
          className="text-lg text-slate-950 outline-none bg-white border border-gray-300 rounded p-2"
          placeholder="Gi To Gym At 5"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-4 mt-4">
        <label className="text-sm font-semibold text-gray-700">CONTENT</label>
        <textarea
          typeof="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 border border-gray-300 p-2 rounded resize-none"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="mt-4">
        <label className="text-sm font-semibold text-gray-700">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      <button className="btn-primary mt-4" onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
