# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Enable corepack for yarn v4 support
RUN corepack enable

# Copy package.json and .yarnrc.yml
COPY package.json .yarnrc.yml ./

# Copy yarn release files if they exist
COPY .yarn ./.yarn

# Install dependencies
RUN yarn install

# Copy the rest of the app
COPY . .

# Build the app
RUN yarn build

# Use a lightweight nginx image to serve the built app
FROM nginx:alpine

# Copy the built app from the previous stage
COPY --from=0 /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]