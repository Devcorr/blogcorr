Questions for Next Time
=========================

* How does the static file hosting and Express integration work with Parse cloud code?
* Will using Parse for hosting static files and redirecting to prerender make things difficult to debug? Can we still
  make our dev environments look similar to prod? How will automated builds, testing and deployment work?
* Is there a risk of prerender caching user specific data? Security concerns?
* What's our MVP set of features? When will we make this platform live?

Todos
==========

* Read though the Parse hosting docs: https://parse.com/docs/hosting_guide#hosting
* Try to integrate Parse cloud code with Prerender.io: https://github.com/mikepugh/prerender-parse
* Add markdown support (use showdown.js?)
* Add icon font
* Integrate CodeMirror for displaying code samples and/or editing posts?
* Create signup page?

Answered Questions
======================

* How does googlebot traverse links of a single page app, even if the first page load is rendered server side?
    I don't think googlebot literally clicks the link, it parses the url from the anchor tag and then requests it.
    So as long as the anchor tag has a valid link in its href the site should be crawable.
    
* Do we need a cheap Node.js server to make things SEO friendly?
    Maybe. It looks like we have a few options.
    * We could render our React components server side with node. There are a couple of problems we might have to solve
      with this approach. The Parse node.js package didn't work correctly in the browser last time I tried. We'd have
      to figure out how to get the Parse SDK working on the client and server, or maybe use the REST API instead. The
      react-router project I'm using to handle URLs also doesn't seem to fully support server side rendering. Based
      on their Github issues they seem to be working on it but it appears to be immature at the moment.
    * Prerender.io. With Prerender, you add middleware to your server that redirects bot requests to Prerender's servers.
      Prerender will either serve a cached copy of the page, or if it's uncached it will request the page from our servers,
      render it via phantomjs, and return the html response. With this approach we don't have to worry about weird
      inconsistencies with running JS modules across the client and server. Downside is that we have to pay for prerender,
      but it might be worth it in time savings. We could also stand up our own prerender service with their open source code
      if it made economic sense. The other issue is that we need some backend server to redirect bot requests to prerender.
      This could be nginx, apache, node, rails, or any other server really. However, to avoid having to pay for an additional server,
      I think I'm first going to try this technique to redirect requests to prerender directly from Parse's cloud code:
      https://github.com/mikepugh/prerender-parse
      
* How have single page apps solved SEO in general (not just specifically react)?
    "escaped_fragments", server side rendering
