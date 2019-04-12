import htm from '/web_modules/htm.js';
import csz from '/web_modules/csz/index.js';

export function app({ React, ReactDOM }) {
  window.React = React
  window.css = csz
  window.html = htm.bind(React.createElement)

  const Fallback = html`
    <div></div>
  `
  const Route = {
    '/': React.lazy(() => window.turbo.preload('/routes/home/index.js') || import('/routes/home/index.js')),
    '*': React.lazy(() => window.turbo.preload('/routes/notfound/index.js') || import('/routes/notfound/index.js')),
  }

  ReactDOM.render(
    html`
      <${React.Suspense} fallback=${Fallback}>
        <${Route[location.pathname] || Route['*']} />
      <//>
    `,
    document.body
  )
}
