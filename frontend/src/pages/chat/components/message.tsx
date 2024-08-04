export type MessageProps = {
  children: string;
  isMe?: boolean;
  seen: boolean;
};

export function Message({ children, isMe, seen }: MessageProps) {
  return (
    <div className="rounded-md">
      {isMe ? (
        <div className="float-end flex flex-col items-end">
          <div className="w-fit max-w-80 break-words rounded-3xl rounded-br-sm bg-primary p-3 text-primary-foreground">
            {children}
          </div>
          <span className=" text-xs">{seen && "Vu"}</span>
        </div>
      ) : (
        <div className="w-fit max-w-80 break-words rounded-3xl rounded-bl-sm bg-secondary p-3 text-secondary-foreground">
          {children}
        </div>
      )}
    </div>
  );
}
