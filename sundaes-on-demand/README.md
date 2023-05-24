## sandaes-on-demand

#### api

- /scoops
- /toppings

#### setup

- npm create vite@latest
- npm i -D prettier
- npm install -D jest @types/jest ts-jest ts-node jest-environment-jsdom
- npm install -D @testing-library/jest-dom @testing-library/react @testing-library/user-event
- npm install -D eslint-plugin-testing-library eslint-plugin-jest-dom

- npm install react-bootstrap bootstrap

- npm install -D msw msw-devtools
- npx msw init public/ --save
- npm install axios

#### memo

- get[All]ByXXX() : expect element to be in DOM
  - getByXXX("xxxx", { exact: false })
- query[All]ByXXX() : expect element not to be in DOM
- await find[All]ByXXX(): expect element to appear async

  - await waitFor() for tests where await find[All]ByXXX() isn't enough

---

- await user.click()
- await user.hover()
- await user.unhover()

---

- "Not wrapped in act()" Error
  - [NG] Test renders component -> Component triggers network call -> Test function exits -> Unmount component -> [x]Network call returns
  - [OK] Test renders component -> Component triggers network call -> Unmount component -> Network call is canceled -> Test function exits
    - axios - canceling request: https://axios-http.com/docs/cancellation
    - 過激派が教える！useEffect の正しい使い方: https://zenn.dev/uhyo/articles/useeffect-taught-by-extremist#%E3%83%87%E3%83%BC%E3%82%BF%E3%82%92%E5%8F%96%E5%BE%97%E3%81%99%E3%82%8B%E7%B3%BB
