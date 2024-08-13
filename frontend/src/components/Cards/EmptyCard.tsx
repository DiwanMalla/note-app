import React from "react";

interface EmptyCardProps {
  isSearch: boolean;
}
const EmptyCard: React.FC<EmptyCardProps> = ({ isSearch }) => {
  return (
    <div className="flex flex-col items-center">
      <img src={isSearch ? "empty.jpg" : "note.jpg"} />
      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        {isSearch
          ? `Oops! No notes found matching your search`
          : ` Start creating your first note! Click the 'Add' button to write down
        your thoughts, ideas, and reminder. Let's get started!`}
      </p>
    </div>
  );
};

export default EmptyCard;
