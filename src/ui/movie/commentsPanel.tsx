import { comment } from "@/lib/defination";

export default function CommentsPannel({ comment }: { comment: comment }) {
  return (
    <div className="border rounded-md py-1 px-2 my-2">
      <div className="flex justify-between">
        <p>{comment.name}</p>
        <p>{comment.date.toLocaleDateString("en-gb")}</p>
      </div>
      <div>
        <p className="justify-center">{comment.text}</p>
      </div>
    </div>
  );
}
