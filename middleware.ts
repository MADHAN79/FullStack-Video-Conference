//with the help of createRouteMatcher we match specific routes as public and private
import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const protectedRoutes = createRouteMatcher([
  '/',
  'upcoming',
  '/previous',
  '/recordings',
  '/personal-room',
  '/meeting(.*)'  //(.*) - it matches all of the meeting routes
])

//the routes passed into this clerkMiddleware() will become public routes.
export default clerkMiddleware((auth, req) => { //two parameters auth & req are passed into callback func.
  //meaning: if the request is a protectedRoute then  pass auth&protect on it.
  if(protectedRoutes(req)) auth().protect();
})


//below comments are already in there while copy pasting from clerk documentation.
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};