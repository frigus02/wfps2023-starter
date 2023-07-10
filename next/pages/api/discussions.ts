import {getDiscussionsList} from "@/server-utils/get-discussions-list";

export default async function handler(req: any, res: any) {
  res.status(200).json(await getDiscussionsList());
}