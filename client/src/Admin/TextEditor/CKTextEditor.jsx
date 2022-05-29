import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import DecoupledEditor from "@ckeditor/ckeditor5-build-decoupled-document";

const CKTextEditor = ({ desc, onChange }) => {
  return (
    <div style={{ width: "100%" }}>
      <CKEditor
        onReady={(editor) => {
          editor.ui
            .getEditableElement()
            .parentElement.insertBefore(
              editor.ui.view.toolbar.element,
              editor.ui.getEditableElement()
            );
        }}
        onError={(error, { willEditorRestart }) => {
          if (willEditorRestart) {
            this.editor.ui.view.toolbar.element.remove();
          }
        }}
        data={desc}
        onChange={onChange}
        editor={DecoupledEditor}
        config={{
          placeholder: "Description...",
          mediaEmbed: {
            previewsInData: true,
          },
        }}
      />
    </div>
  );
};

export default CKTextEditor;
