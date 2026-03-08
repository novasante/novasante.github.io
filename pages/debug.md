---
permalink: /debug/
title: "Debug page"
---

<h1>Site configuration</h1>
```
site: {{ site | debug }}
site.defaults: {{ site.defaults | debug }}
```

<h1>Page configuration</h1>
```
page: {{ page | debug }}
page.defaults: {{ page.defaults | debug }}
```

<h1>Collections</h1>
```
site.practitioners: {{ site.practitioners | debug }}
```