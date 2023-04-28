import React, { useState } from 'react';
import * as marked from 'marked';
import { FaExpandArrowsAlt, FaCompressAlt } from 'react-icons/fa';


const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState('');

  const handleInputChange = (event) => {
    setMarkdown(event.target.value);
  };

  const [isEditorVisible, setEditorVisible] = useState(true);
  const [isPreviewVisible, setPreviewVisible] = useState(true);


  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white py-4">
        <h1 className="text-3xl text-center font-bold">Markdown Previewer</h1>
      </header>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          {isEditorVisible && (
            <div>
              <div className="flex items-center justify-between bg-blue-400 p-2">
                <h2 className="text-xl font-semibold mb-1 flex-grow">Editor</h2>
                {isPreviewVisible && (
                  <FaExpandArrowsAlt className="text-black" onClick={() => setEditorVisible(false)} />
                )}
                {!isPreviewVisible && (
                  <FaCompressAlt className="text-black" onClick={() => setPreviewVisible(true)} />
                )}
              </div>
              <textarea
                id="editor"
                value={markdown}
                onChange={handleInputChange}
                className="w-full p-2 rounded border"
                style={{ minHeight: '300px' }}
              ></textarea>
            </div>
          )}
        </div>
        <div className="">
          {isPreviewVisible && (
            <div>
              <div className="flex items-center justify-between bg-blue-400 p-2">
                <h2 className="text-xl font-semibold mb-1 flex-grow">Preview</h2>
                {isEditorVisible && (
                  <FaExpandArrowsAlt className="text-black" onClick={() => setPreviewVisible(false)} />
                )}
                {!isEditorVisible && (
                  <FaCompressAlt className="text-black" onClick={() => setEditorVisible(true)} />
                )}
              </div>
              <div
                id="preview"
                dangerouslySetInnerHTML={{ __html: marked.parse(markdown) }}
                className="p-2 rounded border"
                style={{ minHeight: '300px' }}
              ></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarkdownPreviewer