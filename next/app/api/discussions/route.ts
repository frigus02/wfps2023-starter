import {getDiscussionsList} from "@/app/server-utils/get-discussions-list";
import {NextResponse} from "next/server";

export async function GET() {
  return NextResponse.json(await getDiscussionsList());
}