type GraphToolbarProps = {
  showNeutralized: boolean;
  onShowNeutralizedChange: (show: boolean) => void;
};

export default function GraphToolbar({
  showNeutralized,
  onShowNeutralizedChange,
}: GraphToolbarProps) {
  return (
    <section className="graph-toolbar">
      <span>
        <span className="legend-line effective-line" />
        Attaque effective
      </span>

      <span>
        <span className={"legend-line neutralized-line" + (!showNeutralized ? " hidden" : "")} />
        <span className={showNeutralized ? "" : "neutralized-line-hidden"}>
          Attaque neutralisée
        </span>
      </span>

      <label className="neutralized-toggle">
        <input
          type="checkbox"
          checked={showNeutralized}
          onChange={(event) => onShowNeutralizedChange(event.target.checked)}
        />
        Afficher les attaques neutralisées
      </label>
    </section>
  );
}
