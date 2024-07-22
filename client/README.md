## Frontend

Run app:

```bash
npm run start
```

Run test:

```bash
npm run test
```

The client application is developed using React JS, HTML, and CSS in their most recent versions compatible with the dependencies used. Each component has unit testing. However, the application does not yet have integration testing, as I am still learning in this area. I also didn't have time to make a responsive and more user-friendly design.

### Project Structure

- **src**
  - **api**: Contains abstract REST methods to encapsulate `axios`.
  - **assets**: Stores static files such as images, global styles, etc.
  - **bridges**: The central point from where APIs are consumed, providing a unified interface to interact with services.
  - **components**: Includes all reusable components of the application.
  - **pages**: Contains the application's pages.
  - **stores**: Implements global state management using `zustand`, with a general store and another specific for user authentication.
  - **types**: Defines TypeScript interfaces.

### Components and Libraries

- **Components**: All reusable components are located in the `components` folder.
- **Pages**: Each necessary page for the application is found in the `pages` folder.
- **External Libraries**:
  - `react-select` for dropdowns.
  - `react-toastify` for notification management.

### Libraries Used

- `@testing-library/jest-dom`: ^6.4.6
- `@testing-library/react`: ^16.0.0
- `@testing-library/user-event`: ^14.5.2
- `@types/jest`: ^29.5.12
- `@types/node`: ^20.14.11
- `@types/react-dom`: ^18.3.0
- `axios`: ^1.3.4
- `jwt-decode`: ^4.0.0
- `react`: ^18.3.1
- `react-dom`: ^18.3.1
- `react-hook-form`: ^7.52.1
- `react-router-dom`: ^6.25.1
- `react-scripts`: 5.0.1
- `react-select`: ^5.8.0
- `react-toastify`: ^10.0.5
- `typescript`: ^4.9.5
- `web-vitals`: ^2.1.4
- `zustand`: ^4.5.4
