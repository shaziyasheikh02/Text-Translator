export default function TranslationResult({ translated }) {
  if (!translated) return null;
  return (
    <div className="p-4 bg-green-50 border rounded-lg">
      <p className="text-lg">{translated}</p>
      
      
    </div>
  );
}
