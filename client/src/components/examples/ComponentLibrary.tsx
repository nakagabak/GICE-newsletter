import ComponentLibrary from '../ComponentLibrary';

export default function ComponentLibraryExample() {
  return (
    <div className="h-screen">
      <ComponentLibrary onAddBlock={(type) => console.log(`Adding block: ${type}`)} />
    </div>
  );
}
