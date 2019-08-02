### VueJS Styleguide
This is our official style guide for Vue-specific code at Plan.net Business Intelligence.
#### General rules
* [Read and follow the official VueJS Styleguide](https://vuejs.org/v2/style-guide)
* Also consider the [unofficial VueJS Styleguide](https://gist.github.com/letanure/8b4e8ee8f7b065860df942f0e53d6fc9 )

#### Module based development
Always construct your app out of small modules which do one thing and do it well. A module is a small self-contained part of an application. The Vue.js library is specifically designed to help you create view-logic modules.
##### Why?
Small modules are easier to learn, understand, maintain, reuse and debug. Both by you and other developers.
##### How?
Each Vue component (like any module) must be FIRST: Focused (single responsibility), Independent, Reusable, Small and Testable.
If your component does too much or gets too big, split it up into smaller components which each do just one thing. As a rule of thumb, try to keep each component file less than 100 lines of code. Also ensure your Vue component works in isolation. For instance by adding a stand-alone demo.<br>
[vuejs-component-style-guide](https://github.com/pablohpsilva/vuejs-component-style-guide#module-based-development)

#### Receive an object, return an object (RORO)
* Named parameters
* Cleaner default parameters
* Richer return values
* Easy function composition

[Source](https://medium.freecodecamp.org/elegant-patterns-in-modern-javascript-roro-be01e7669cbd)

#### Self-documented code over comprehensive comments
* structural  
* naming related
* syntax related

[Source](https://www.sitepoint.com/self-documenting-javascript/)

