# TrailersFlix
![TrailersFlix](https://github.com/iammiracle01/movie-trailer-app/blob/main/public/trailersflix.PNG?raw=true)

TrailersFlix is a web application that allows users to search for movies and watch trailers. The application fetches movie data from the TMDb API, leveraging Vite for a fast development environment and Tailwind CSS for styling. It also integrates React YouTube to provide seamless trailer playback directly within the app.

## Live Demo

You can check out the live demo at [https://trailersflix.netlify.app/](https://trailersflix.netlify.app/).

## Features

- Search Movies: Users can search for movies using a search bar, which queries the TMDb API for relevant results.
- Movie Details: Display detailed information about selected movies, including title, overview, release date, and rating.
- Watch Trailers: Users can watch movie trailers directly within the app using the React YouTube component.

## Technologies Used

- React + Vite: A fast build framework that provides a smooth development experience for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for styling the application.
- React YouTube: A React component for embedding YouTube videos.

## How to Use

1. Clone the repository
2. Install the dependencies with `npm install` or `yarn install`
3. Start the development server with `npm run dev` or `yarn dev`
4. Open [http://localhost:5173](http://localhost:5173) with your browser to see the result

## Deployment

TrailersFlix is deployed on Netlify. To deploy your own version of the app, follow these steps:

1. Go to [Netlify](https://www.netlify.com/) and sign up or log in.
2. Click on "New site from Git" and connect your Git repository.
3. Select the repository containing the TrailersFlix code.
4. Configure the build settings:
    Build Command: npm run build or yarn build
    Publish Directory: dist
5. Click "Deploy site" and Netlify will build and deploy your application.

For more information on deploying with Netlify, check out the [Netlify Documentation](https://docs.netlify.com/frameworks/vite/).

## Learn More

To learn more about the technologies used in TrailersFlix, check out the following resources:

- [Vite Documentation](https://vitejs.dev/guide/) -  Learn about Vite and its features.
- [Tailwind CSS Documentation](https://tailwindcss.com/docs/installation) -  Learn about Tailwind CSS and its utility-first approach.
- [React YouTube Documentation](https://www.npmjs.com/package/react-youtube) - Learn about the React YouTube component and its usage.

