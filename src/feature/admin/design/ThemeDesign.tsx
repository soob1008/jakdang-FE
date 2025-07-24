import DesignOptionItem from "./DesignOptionItem";

const themes = [
  { id: "theme1", label: "Theme 1", bg: "bg-pink-100" },
  { id: "theme2", label: "Theme 2", bg: "bg-blue-100" },
  { id: "theme3", label: "Theme 3", bg: "bg-green-100" },
  { id: "theme4", label: "Theme 4", bg: "bg-yellow-100" },
  { id: "theme5", label: "Theme 5", bg: "bg-purple-100" },
];

export default function ThemeDesign() {
  return (
    <section className="px-6 py-4 bg-white rounded-xl shadow-sm">
      <h3 className="font-bold text-lg">Theme</h3>
      <div className="grid grid-cols-7 gap-4 mt-4">
        {themes.map((theme) => (
          <DesignOptionItem
            key={theme.id}
            id={theme.id}
            label={theme.label}
            fieldName="theme"
            bg={theme.bg}
          />
        ))}
      </div>
    </section>
  );
}
