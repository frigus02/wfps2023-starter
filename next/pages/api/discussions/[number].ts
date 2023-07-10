import { getDiscussionDetail } from "@/server-utils/get-discussion-detail";

export default async function handler(req: any, res: any) {
  const { number } = req.query;
  res.status(200).json(await getDiscussionDetail(Number(number)));
}