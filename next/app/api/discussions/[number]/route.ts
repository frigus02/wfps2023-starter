import {getDiscussionDetail} from "@/app/server-utils/get-discussion-detail";
import {NextResponse} from "next/server";

export async function GET(
  request: Request,
  {params}: {params: {number: string}}
) {
  return NextResponse.json(
    await getDiscussionDetail(Number(params.number)));
}
