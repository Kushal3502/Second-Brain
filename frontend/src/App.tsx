import { Plus } from "lucide-react";
import "./App.css";
import Button from "./components/ui/Button";

function App() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline bg-indigo-400">
        Hello world!
      </h1>
      <Button
        onClick={() => console.log("Hello")}
        variant="primary"
        size="md"
      >
        <Plus />
        Save
      </Button>
    </div>
  );
}

export default App;
