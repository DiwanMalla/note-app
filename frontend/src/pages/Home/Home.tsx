import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";
import AddEditNotes from "./AddEditNotes";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utilis/axiosInstance";
import { AxiosError } from "axios";
import Toast from "../../components/ToastMessage/Toast";
import EmptyCard from "../../components/Cards/EmptyCard";

const Home = () => {
  const [openAddEditMode, setOpenAddEditMode] = useState({
    isShown: false,
    type: "add",
    data: null,
  });

  //Toast Message
  const [showToastMsg, setShowToastMsg] = useState({
    isShown: true,
    message: "",
    type: "add",
  });

  const showToastMessage = (message: string, type: string) => {
    setShowToastMsg({
      isShown: true,
      message: `Note ${message} Succesfully`,
      type,
    });
  };
  const handleCloseToast = () => {
    setShowToastMsg({ isShown: false, message: "", type: "" });
  };
  interface Note {
    _id: number;
    title: string;
    createdOn: string;
    content: string;
    tags: string[];
    isPinned: boolean;
  }
  const [userInfo, setUserInfo] = useState(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isSearch, setIsSearch] = useState(false);
  const navigate = useNavigate();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleEdit = (noteDetail: any) =>
    setOpenAddEditMode({
      isShown: true,
      type: "edit",
      data: noteDetail,
    });

  //getUserInfo
  const getUserInfo = async () => {
    try {
      const response = await axiosInstance.get("/get-user");
      if (response.data?.user) {
        setUserInfo(response.data.user);
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response?.status === 400) {
          localStorage.clear();
          navigate("/login");
        }
      }
    }
  };

  //get all notes
  const AllNotes = async () => {
    try {
      const response = await axiosInstance.get("/get-all-notes");
      if (response.data?.notes) {
        setNotes(response.data.notes);
      }
      console.log(notes);
    } catch (err) {
      console.log(`Unexpected error occured ${err}`);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDelete = async (data: any) => {
    const noteId = data._id;

    try {
      const response = await axiosInstance.delete("/delete-note/" + noteId, {});
      if (response.data && !response.data.error) {
        showToastMessage("Deleted", "delete");
        AllNotes();
      }
      // if(response.data)
    } catch (err) {
      console.log(`Unexpected Error occured. Please try again ${err}`);
    }
  };

  //Search
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSearchNote = async (query: any) => {
    try {
      const response = await axiosInstance.get("/search-notes", {
        params: { query },
      });
      if (response.data && response.data.notes) {
        setIsSearch(true);
        setNotes(response.data.notes);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handlePinned = async (note: any) => {
    const noteID = note._id;
    console.log(note.isPinned);
    try {
      const response = await axiosInstance.put(
        "/update-note-pinned/" + noteID,
        {
          isPinned: !note.isPinned,
        }
      );
      if (response.data?.note) {
        showToastMessage("Updated", "pin");
        AllNotes();
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getUserInfo();
    AllNotes();
    return () => {};
  }, []);

  return (
    <div>
      <Navbar
        userInfo={userInfo}
        onSearchNote={onSearchNote}
        AllNotes={AllNotes}
      />
      <div className="container mx-auto px-4">
        {notes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
            {notes.map((note) => (
              <NoteCard
                key={note._id}
                title={note.title}
                date={note.createdOn}
                content={note.content}
                tags={note.tags}
                isPinned={note.isPinned}
                onEdit={() => handleEdit(note)}
                onDelete={() => handleDelete(note)}
                onPinNote={() => {
                  handlePinned(note);
                }}
              />
            ))}
          </div>
        ) : (
          <EmptyCard isSearch={isSearch} />
        )}
      </div>

      <button
        className="fixed w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-600 right-4 bottom-4 lg:right-10 lg:bottom-10"
        onClick={() => {
          setOpenAddEditMode({ isShown: true, type: "add", data: null });
        }}
      >
        <MdAdd className="text-2xl text-white" />
      </button>
      <Modal
        isOpen={openAddEditMode.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: { backgroundColor: "rgba(0,0,0,0.2)" },
          content: {
            maxWidth: "100vw",
            maxHeight: "100vh",
            margin: "0 auto",
            padding: "20px",
            borderRadius: "8px",
          },
        }}
        contentLabel=""
        className="overflow-y-auto max-h-screen w-full max-w-lg sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 bg-white rounded-md mx-auto mt-14 p-5 overflow-auto"
      >
        <AddEditNotes
          type={openAddEditMode.type}
          noteData={openAddEditMode.data}
          onClose={() =>
            setOpenAddEditMode({
              isShown: false,
              type: "add",
              data: null,
            })
          }
          AllNote={AllNotes}
          showToastMessage={showToastMessage}
        />
      </Modal>

      <Toast
        isShown={showToastMsg.isShown}
        message={showToastMsg.message}
        type={showToastMsg.type}
        onClose={handleCloseToast}
      />
    </div>
  );
};

export default Home;
