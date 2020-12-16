# Changelog

### 1.0.0 - Project Initiation (24 Dec 2019)

React Boilerplate v4.0.0 is out and it's a doozy! Here are the highlights:

-   React has added many new features and it's time for React Boilerplate to embrace them.
    -   We now use `React.lazy` and `Suspense` for component lazy-loading instead of an external library.
    -   We've added `useInjectSaga` and `useInjectReducer` hooks to manage saga and reducer injection. They're integrated into the generators and thus become the new defaults. (Should you need them, the HOCs are still there.)
    -   The generators don't support classes anymore. The `PureComponent` vs `Component` choice was replaced with an option to wrap your component inside `React.memo`.
-   After much deliberation, `Immutable.js` is finally gone. We've added `Immer` instead. With it, we can write very concise and readable reducers while sticking to native JavaScript data structures.
-   Following the release of React Hooks, it's become even clearer that `react-testing-library` is now the industry-standard for React DOM testing. Workarounds for the incompatibilities between `enzyme` and `styled-components` are gone and we can now write leaner and more meaningful tests.

There are many more changes to our documentation, internals and general project setup. You can find a full changelog below.

Huge thanks to @Mensae, @gretzky, @jwinn and everyone who helped review or submit PRs! If I've forgotten your contribution in the credits below, please let me know.

We hope you enjoy this release and welcome any feedback, bug reports or feature suggestions you can send our way!

### 1.1.0 - Theme implementation and reducks (22 Jan 2020)

`Theme`

_ Main theme: \_metronic
_ Layout Builder: uses react-redux to configure layout state, which enables live changes of the layout according to layout state. Default configs are stored inside specific theme/layout folder.
_ ReduxPersist: Persist states, especially layout state.
_ Custom router works according to router configs.
_ Custom axios request headers that contains user token with every request made to server. (See more in utils/request.js)
_ flaticon & flaticon2
_ Semantic folder structure tree for future expansions of the app
_ Foundation built for future flexible Layout changes (using Layout as a props and Component Wrapper, this way we can have multiple Layouts predefined and apply whenever we want to)
\_ Current API call-flow:
`actions -> saga -> actions.success -> state changes -> UI/UX`
