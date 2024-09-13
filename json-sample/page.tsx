import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";

const sampleJson = `
[
  {
    "title": "Basic Git Commands",
    "commands": [
      {
        "name": "Initialize Repository",
        "command": "git init",
        "description": "Create an empty Git repository or reinitialize an existing one",
        "tag": "Setup"
      },
      {
        "name": "Clone Repository",
        "command": "git clone <repository-url>",
        "description": "Create a copy of a remote repository on your local machine",
        "tag": "Setup"
      },
      {
        "name": "Check Status",
        "command": "git status",
        "description": "Show the working tree status",
        "tag": "Info"
      }
    ]
  },
  {
    "title": "Branching and Merging",
    "commands": [
      {
        "name": "Create Branch",
        "command": "git branch <branch-name>",
        "description": "Create a new branch",
        "tag": "Branch"
      },
      {
        "name": "Switch Branch",
        "command": "git checkout <branch-name>",
        "description": "Switch to a specified branch",
        "tag": "Branch"
      },
      {
        "name": "Merge Branch",
        "command": "git merge <branch-name>",
        "description": "Merge specified branch into the current branch",
        "tag": "Branch"
      }
    ]
  }
]
`;

export default function JsonSamplePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Sample JSON Structure</h1>
      <p className="mb-4">
        Here's an example of the JSON structure you can use to create a new
        cheat sheet:
      </p>
      <SyntaxHighlighter
        language="json"
        style={vscDarkPlus}
        className="rounded-md"
      >
        {sampleJson}
      </SyntaxHighlighter>
      <p className="mt-4">
        You can copy this structure and modify it to create your own cheat
        sheet. Make sure to replace the sample content with your own sections,
        commands, descriptions, and tags.
      </p>
    </div>
  );
}
