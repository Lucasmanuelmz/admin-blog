import { Transforms, Editor, Range } from "slate";
import { ReactEditor } from "slate-react";

export const CustomEditor = {
 
  toggleHeading(editor, level) {
    const isActive = CustomEditor.isActive(editor, 'heading', level);
    const type = isActive ? 'paragraph' : 'heading';
    
    const levelAttribute = isActive ? undefined : { level };

    CustomEditor.toggleBlock(editor, type, levelAttribute);
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isActive(editor, 'bold');
    CustomEditor.toggleMark(editor, 'bold', !isActive);
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isActive(editor, 'code');
    const type = isActive ? 'paragraph' : 'code';
    
    CustomEditor.toggleBlock(editor, type);
  },

  toggleBlock(editor, type, level) {
    const isActive = CustomEditor.isActive(editor, type, level);

    if (isActive) {
      Transforms.unwrapNodes(editor, {
        match: (n) => Editor.isBlock(editor, n) && n.type === type,
      });
    } else {
      Transforms.wrapNodes(editor, { type, level, children: [] });
    }
  },

  toggleMark(editor, mark, active) {
    if (active) {
      Transforms.addMark(editor, mark);
    } else {
      Transforms.removeMark(editor, mark);
    }
  },

  isActive(editor, type, level) {
    const [match] = Editor.nodes(editor, {
      match: (n) => n.type === type && (level ? n.level === level : true),
      universal: true,
    });
    return !!match;
  },
};
