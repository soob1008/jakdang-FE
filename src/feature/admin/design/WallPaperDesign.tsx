import DesignOptionItem from "./DesignOptionItem";

const themes = [
  { id: "wallpaper1", label: "Wallpaper 1", bg: "bg-pink-100" },
  { id: "wallpaper2", label: "Wallpaper 2", bg: "bg-blue-100" },
  { id: "wallpaper3", label: "Wallpaper 3", bg: "bg-green-100" },
  { id: "wallpaper4", label: "Wallpaper 4", bg: "bg-yellow-100" },
  { id: "wallpaper5", label: "Wallpaper 5", bg: "bg-purple-100" },
];

export default function WallPaperDesign() {
  return (
    <section className="px-6 py-4 bg-white rounded-xl shadow-sm">
      <h3 className="font-bold text-lg">Wallpaper</h3>
      <div className="grid grid-cols-7 gap-4 mt-4">
        {themes.map((theme) => (
          <DesignOptionItem
            key={theme.id}
            id={theme.id}
            label={theme.label}
            bg={theme.bg}
          />
        ))}
      </div>
    </section>
  );
}
