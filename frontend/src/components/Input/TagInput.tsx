import { SetStateAction, useState } from "react";
import { MdAdd, MdClose } from "react-icons/md";

interface TagInputProps {
  tags: string[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setTags: (tags: string[]) => void;
}
const TagInput: React.FC<TagInputProps> = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");
  const handleInputChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setInputValue(e.target.value);
  };
  const addNewTag = () => {
    if (inputValue.trim() !== "" && !tags.includes(inputValue.trim())) {
      setTags([...tags, inputValue.trim()]);
      setInputValue("");
    }
  };
  const handleKeyDown = (e: { key: string }) => {
    if (e.key === "Enter") {
      addNewTag();
    }
  };
  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag: string) => tag !== tagToRemove));
  };

  return (
    <div>
      <div>
        {tags?.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {tags.map((tag: string, index: number) => (
              <span
                key={index}
                className=" flex items-center gap-2 text-sm text-slate-900 bg-slate-100 px-3 py-1 rounded"
              >
                #{tag}
                <button
                  onClick={() => {
                    handleRemoveTag(tag);
                  }}
                >
                  <MdClose />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <button
          className="w-8 h-8 flex items-center justify-center rounded border border-blue-700 hover:bg-blue-700"
          onClick={() => {
            addNewTag();
          }}
        >
          <MdAdd className="text-2xl text-blue-700 hover:text-white" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
