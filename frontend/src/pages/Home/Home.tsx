import { MdAdd } from "react-icons/md";
import NoteCard from "../../components/Cards/NoteCard";
import Navbar from "../../components/Navbar/Navbar";

const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8">
          <NoteCard
            title="Meeting on 10 aug"
            date="3rd Apr 2024"
            content="Meeting on 7th April Meeting on 7th april"
            tags="#meeting"
            isPinned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-2xl bg-primary hover:bg-blue-600 absolute right-10 lg:bottom-10">
        <MdAdd className="text-[32px] text-white" />
      </button>
    </div>
  );
};

export default Home;
