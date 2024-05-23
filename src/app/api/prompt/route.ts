import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";
import { NextRequest, NextResponse } from "next/server";
export const dynamic = "force-dynamic";

// GET 함수 정의
export const GET = async (req: NextRequest) => {
  try {
    // 데이터베이스에 연결
    await connectToDB();

    // 모든 프롬프트를 가져오고 크리에이터 정보를 함께 가져옵니다.
    const prompts = await Prompt.find({}).populate("creator");

    // 성공적으로 데이터를 가져왔을 경우 JSON 형식으로 응답을 반환합니다.
    return new NextResponse(JSON.stringify(prompts), { status: 200 });
  } catch (error) {
    // 데이터 가져오기 실패 시 오류 응답을 반환합니다.
    return new NextResponse("failed to fetch all prompts", { status: 500 });
  }
};
