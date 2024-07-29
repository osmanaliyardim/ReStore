# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json', './tsconfig.app.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

## Components used

1. React
2. Vite
3. Material UI
4. React Router
5. Redux
6. Axios
7. Simple .NET WebApi

## My personal notes

1. React is a component-based JavaScript library.
2. Virtual DOM is a virtualized version of Real DOM.
3. RFC, RCC snippets created under => C:\Users\osman\AppData\Roaming\Code\User\snippets
4. We can store our basket in:
    * LocalStorage (Persistent, Easy acces-updatable from client, Server unaware)
    * Cookies (Persistent, Sent with every req to/from server, Updated on the server and returned to the client)
    * Server (Relational db features, Need to update on the server & client, Possible to track events in the basket)
5. React Context enables us to send our context directly to component that needs it. (Otherwise, it causes unnecessary dependencies, all the way to reach related component)
6. Redux is available for any kind of JS library/framework. Redux is for managing state in an app. 
    * Contains the app state (store)
    * One store per app
    * Each store can have many 'reducers' or 'slices' of state
    * Redux is the same thing with Context, but it's more powerful and scalable.
    * One Way Flow of Redux (Store -> Provider -> App -> Components -> Actions -> Reducers [CatalogReducer]-[BasketReducer])
    * Do not mutate state, reducers must not have side effects, cannot contain non-seriazible values, only 1 store per app
    * Redux Toolkit simplifies Redux code, optionionated, good defaults for store setup, less boilerplate
7. ThunkAPI can be used for catching expcetions/errors and getting state of Redux in AsyncThunkActions.
8. Pagination helps to avoid performance issues, 
    * Parameters passed by query string, 
    * Page size should be limitied, 
    * Should always be implemented if possible,
    * Implemented with IQuaryable<T> (Deferred Execution): OrderBy, Where, Take, Skip
9. Benefits of Json Web Token (JWT):
    * Self-contained - no session to manage
    * Portable - single token can be used with multiple backends
    * Mobile friendly - no cookies required
    * Performance - no need to make DB requests to validate
10. There are 3 main types of forms in React (from fastest to slowest) => React Hook Form, Formik and Redux Form
11. React Hook Form Resolvers (YUP library) can be used for form validation errors.