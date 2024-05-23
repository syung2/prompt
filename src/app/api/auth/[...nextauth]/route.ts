import NextAuth, { NextAuthOptions, Session } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { Profile as NextAuthProfile, SessionOptions } from "next-auth";
import { connectToDB } from "@/utils/database";
import User from "@/models/user";
// 환경 변수를 문자열로 단언합니다.
const clientId = process.env.GOOGLE_ID as string;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET as string;

if (!clientId || !clientSecret) {
  throw new Error("Missing Google client ID or secret");
}

// Profile 타입 확장
interface Profile extends NextAuthProfile {
  picture?: string;
}

const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: clientId,
      clientSecret: clientSecret,
    }),
  ],
  callbacks: {
    async session({ session }: { session: Session }) {
      // 세션 처리 로직을 구현합니다.
      if (session.user) {
        const sessionUsers = await User.findOne({
          email: session?.user?.email,
        });
        session.user.id = sessionUsers?._id.toString();
      }
      return session;
    },
    async signIn({ profile }: { profile?: Profile }) {
      // 로그인 처리 로직을 구현합니다.
      try {
        await connectToDB();

        // check if a user already exits
        const userExits = await User.findOne({
          email: profile?.email,
        });

        // if not, create a new user
        if (!userExits) {
          await User.create({
            email: profile?.email,
            username: profile?.name?.replace(" ", "").toLocaleLowerCase(),
            image: profile?.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
};

const handler = NextAuth(options);

export { handler as GET, handler as POST };
