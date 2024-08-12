import NoteModel from "../models/note_models.js";

export const AddNote = async (req, res) => {
  const { title, content, tags } = req.body;
  const { user } = req.user;
  if (!title) {
    return res.status(400).json({ error: true, message: `Title is required` });
  }
  if (!content) {
    return res
      .status(400)
      .json({ error: true, message: `Content is required` });
  }
  if (!tags) {
    return res.status(400).json({ error: true, message: `Tags is required` });
  }
  try {
    const note = new NoteModel({
      title,
      content,
      tags: tags || [],
      userId: user._id,
    });
    await note.save();
    return res.status(200).json({
      error: false,
      note,
      message: `Note is added succesfully`,
    });
  } catch (err) {
    return res.status(500).json({ message: `Internal Server Error` });
  }
};

export const EditNote = async (req, res) => {
  console.log(req.body);
  const noteID = req.params.noteID;
  const { title, content, tags, isPinned } = req.body;
  const { user } = req.user;
  if (!title && !content && !tags) {
    return res
      .status(400)
      .json({ error: true, message: "No changes provided" });
  }
  try {
    const note = await NoteModel.findOne({ _id: noteID, userId: user._id });
    console.log(noteID);
    if (!note) {
      return res.status(404).json({ error: true, message: `Note not found` });
    }
    if (title) note.title = title;
    if (content) note.content = content;
    if (tags) note.tags = tags;
    if (isPinned) note.isPinned = isPinned;

    await note.save();
    return res.status(200).json({
      error: false,
      note,
      message: `Note Updated Successfully `,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: true, message: `Internal Server error ${err} ` });
  }
  console.log(noteID);
};

export const GetAllNotes = async (req, res) => {
  const { user } = req.user;
  try {
    const notes = await NoteModel.find({ userId: user._id }).sort({
      isPinned: -1,
    });
    return res
      .status(200)
      .json({ error: false, notes, message: `All Notes Retrived Succesfully` });
  } catch (err) {
    return res
      .status(404)
      .json({ error: true, message: `Internal Server Error` });
  }
};

export const DeleteNote = async (req, res) => {
  const noteID = req.params.noteID;
  const { user } = req.user;
  try {
    const note = await NoteModel.findOne({ userId: user._id, _id: noteID });
    console.log(noteID);
    if (!note) {
      return res.status(400).json({ error: true, message: `Note not found` });
    }
    await NoteModel.deleteOne({ _id: noteID, userId: user._id });
    return res
      .status(200)
      .json({ error: false, message: `Note Deleted Succesfully` });
  } catch (err) {}
};
