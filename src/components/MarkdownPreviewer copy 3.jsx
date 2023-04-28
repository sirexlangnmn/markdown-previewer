import React, { useState, useEffect } from 'react';
import * as marked from 'marked';

import { FaExpandArrowsAlt, FaCompressAlt } from 'react-icons/fa';



const MarkdownPreviewer = () => {

  const [isEditorVisible, setEditorVisible] = useState(true);
  const [isPreviewVisible, setPreviewVisible] = useState(true);


  //Initialize a markdown string
  const initialMarkdown = `# Welcome to my React Markdown Previewer!

  ## This is a sub-heading...
  ### And here's some other cool stuff:
  
  Heres some code, \`<div></div>\`, between 2 backticks.
  
  \`\`\`
  // this is multi-line code:
  
  function anotherExample(firstLine, lastLine) {
    if (firstLine === '\\\`\\\`\\\`' && lastLine === '\\\`\\\`\\\`') {
      return multiLineCode;
    }
  }
  \`\`\`
  
  You can also make text **bold**... whoa!
  Or _italic_.
  Or... wait for it... **_both!_**
  And feel free to go crazy ~~crossing stuff out~~.
  
  There's also [links](https://www.freecodecamp.org), and
  > Block Quotes!
  
  And if you want to get really crazy, even tables:
  
  Wild Header | Crazy Header | Another Header?
  ------------ | ------------- | -------------
  Your content can | be here, and it | can be here....
  And here. | Okay. | I think we get it.
  
  - And of course there are lists.
    - Some are bulleted.
       - With different indentation levels.
          - That look like this.
  
  
  1. And there are numbered lists too.
  1. Use just 1s if you want!
  1. And last but not least, let's not forget embedded images:
  
  ![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)`;
  
  // Use the useState hook to create a state variable `markdown` and a setter function `setMarkdown` to update its value. The initial value is set to `initialMarkdown`.
  const [markdown, setMarkdown] = useState(initialMarkdown);

  // Define a function `handleInputChange` that updates the `markdown` state with the new value whenever the input changes. The new value is obtained from `event.target.value`.
  const handleInputChange = (event) => {
    setMarkdown(event.target.value);
  };

  const renderedMarkdown = marked.parse(markdown);

  // const splitLines = initialMarkdown.split('\n');
  // const firstLine = splitLines[0];
  // const secondLine = splitLines[2];
  // const thirdLine = splitLines[3];

  const splitLines = initialMarkdown.split(/(^#\s.*$)/m).filter(Boolean) && initialMarkdown.split('\n');
  const firstLine = splitLines[0];
  const secondLine = splitLines[2];
  const thirdLine = splitLines[3];

  console.log('splitLines: ', splitLines);
  console.log('firstLine: ', firstLine);
  console.log('secondLine: ', secondLine);
  console.log('thirdLine: ', thirdLine);

  // Remove the extracted lines from initialMarkdown
  const updatedMarkdown = initialMarkdown.replace(
    initialMarkdown
  );

  
  console.log('updatedMarkdown: ', updatedMarkdown);

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
              {/* <div
                id="preview"
                className="p-2 rounded border"
                style={{ minHeight: '300px' }}
              >
                <h1 className="text-3xl font-bold">
                  Welcome to my React Markdown Previewer!
                </h1>
                <hr className='mt-1 border-2 border-black'/>

                <h2 className="text-2xl font-bold mt-6">
                  This is a sub-heading...
                </h2>
                <hr className='mt-1 border-1 border-black'/>

                <h3 className="text-xl font-bold mt-6">
                 And here's some other cool stuff:
                </h3>
              </div> */}
              <div
            id="preview"
            className="p-2 rounded border"
            style={{ minHeight: '300px' }}
          >
            <h1 className="text-3xl font-bold">{firstLine}</h1>
            <hr className="mt-1 border-2 border-black" />

            <h2 className="text-2xl font-bold mt-6">{secondLine}</h2>
            <hr className="mt-1 border-1 border-black" />

            <h3 className="text-xl font-bold mt-6">{thirdLine}</h3>

            <div
              className="prose"
              dangerouslySetInnerHTML={{ __html: renderedMarkdown  }}
            ></div>
          </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default MarkdownPreviewer