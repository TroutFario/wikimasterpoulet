import type { Actor, Argument } from "../../types/argumentation";

type ActorComparisonProps = {
  mainActor: Actor;
  comparisonActor: Actor;
  mainEffectiveCount: number;
  mainNeutralizedCount: number;
  comparisonEffectiveCount: number;
  comparisonNeutralizedCount: number;
  mainExtensions: Argument[][];
  comparisonExtensions: Argument[][];
};

export default function ActorComparison({
  mainActor,
  comparisonActor,
  mainEffectiveCount,
  mainNeutralizedCount,
  comparisonEffectiveCount,
  comparisonNeutralizedCount,
  mainExtensions,
  comparisonExtensions,
}: ActorComparisonProps) {
  return (
    <section className="comparison-panel">
      <div className="comparison-heading">
        <div>
          <h2>Comparaison des agents</h2>
          <p>
            Les deux agents évaluent les mêmes arguments et les mêmes attaques selon leurs propres
            préférences.
          </p>
        </div>
      </div>

      <div className="comparison-columns">
        <article className="comparison-card">
          <h3>{mainActor.name} (agent principal)</h3>

          <div className="comparison-metrics">
            <div className="comparison-metric">
              <span>Attaques effectives</span>
              <strong className="effective-count">{mainEffectiveCount}</strong>
            </div>

            <div className="comparison-metric">
              <span>Attaques neutralisées</span>
              <strong className="neutralized-count">{mainNeutralizedCount}</strong>
            </div>
          </div>

          <h4>Extensions préférées</h4>

          <div className="extensions-container">
            {mainExtensions.map((extension, index) => (
              <div className="extension-box" key={`main-${index}`}>
                <h2>#{index + 1}</h2>

                {extension.map((argument) => (
                  <span className="value-tag" key={argument.id}>
                    {argument.title}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </article>

        <article className="comparison-card">
          <h3>{comparisonActor.name} (agent de référence)</h3>

          <div className="comparison-metrics">
            <div className="comparison-metric">
              <span>Attaques effectives</span>
              <strong className="effective-count">{comparisonEffectiveCount}</strong>
            </div>

            <div className="comparison-metric">
              <span>Attaques neutralisées</span>
              <strong className="neutralized-count">{comparisonNeutralizedCount}</strong>
            </div>
          </div>

          <h4>Extensions préférées</h4>

          <div className="extensions-container">
            {comparisonExtensions.map((extension, index) => (
              <div className="extension-box" key={`comparison-${index}`}>
                <h2>#{index + 1}</h2>

                {extension.map((argument) => (
                  <span className="value-tag" key={argument.id}>
                    {argument.title}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}
