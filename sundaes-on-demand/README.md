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
- query[All]ByXXX() : expect element not to be in DOM
- await find[All]ByXXX(): expect element to appear async

- await user.click()
- await user.hover()
- await user.unhover()
