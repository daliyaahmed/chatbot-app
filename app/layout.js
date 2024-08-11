import { Inter } from "next/font/google";
import "./globals.css";
import { auth } from '@clerk/nextjs/server';
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import Image from 'next/image';
import logo from './public/images/logowizard.jpg';

const inter = Inter({ subsets: ["latin"] });




export const metadata = {
  title: "Wizarding World AI",
  description: "Unleash the magic of AI conversations",
};

export default function RootLayout({ children }) {
  
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-gradient-to-r from-purple-500 via-indigo-600 to-blue-700`}>
        <SignedIn afterSignInUrl="/AuthenticatedHome">
          <header className="absolute top-4 right-4">
            <UserButton afterSignOutUrl="/" showName/>
          </header>
           
        </SignedIn>
        <SignedOut>
            
        </SignedOut>
        <header>
          
            <Image src={logo} alt="Your Logo" width={45} height={35} style={{ borderRadius: '50%' , marginLeft: '30px' , marginTop: '10px' , marginBottom: '10px'}}/>
             
        </header>
          {children}

        </body>
      </html>
    </ClerkProvider>
  );
}