import { Editor, Transforms } from "slate";

export const CustomEditor = {
  isHeadingActive(editor, level) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "heading" && n.level === level,
    });
    return !!match;
  },

  toggleHeading(editor, level) {
    const isActive = CustomEditor.isHeadingActive(editor, level);
    Transforms.setNodes(
      editor,
      isActive ? { type: "paragraph" } : { type: "heading", level },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  },

  isBoldMarkActive(editor) {
    const marks = Editor.marks(editor);
    return marks ? marks.bold === true : false;
  },

  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === "code",
    });

    return !!match;
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor);
    if (isActive) {
      Editor.removeMark(editor, "bold");
    } else {
      Editor.addMark(editor, "bold", true);
    }
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor);
    Transforms.setNodes(
      editor,
      { type: isActive ? null : "code" },
      { match: (n) => Editor.isBlock(editor, n) },
    );
  },
};
