import { Transforms, Editor } from "slate";

export const HeadingElement = ({ attributes, children, element }) => {
  const Tag = `h${Math.min(element.level || 1, 6)}`;
  return <Tag {...attributes}>{children}</Tag>;
};

export const formatButtons = [
  { label: "H1", command: (editor) => CustomEditor.toggleHeading(editor, 1) },
  { label: "H2", command: (editor) => CustomEditor.toggleHeading(editor, 2) },
  { label: "H3", command: (editor) => CustomEditor.toggleHeading(editor, 3) },
  { label: "B", command: (editor) => CustomEditor.toggleBoldMark(editor) },
  { label: "< >", command: (editor) => CustomEditor.toggleCodeBlock(editor) },
];

export const CustomEditor = {
  toggleHeading(editor, level) {
    const isActive = CustomEditor.isBlockActive(editor, "heading", level);
    Transforms.setNodes(
      editor,
      isActive ? { type: "paragraph" } : { type: "heading", level }
    );
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isMarkActive(editor, "bold");
    isActive
      ? Editor.removeMark(editor, "bold")
      : Editor.addMark(editor, "bold", true);
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isBlockActive(editor, "code");
    Transforms.setNodes(editor, { type: isActive ? "paragraph" : "code" });
  },

  isBlockActive(editor, type, level) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === type && (!level || n.level === level),
    });
    return !!match;
  },

  isMarkActive(editor, mark) {
    const marks = Editor.marks(editor);
    return marks ? marks[mark] : false;
  },
};
