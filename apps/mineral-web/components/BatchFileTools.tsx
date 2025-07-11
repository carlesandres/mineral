interface BatchFileToolsProps {
  delete: () => void;
}

const BatchFileTools = (props: BatchFileToolsProps) => (
  <div>
    <h2>Tools</h2>
    <button className="clickable" onClick={props.delete}>
      Delete all empty files
    </button>
  </div>
);

export default BatchFileTools;