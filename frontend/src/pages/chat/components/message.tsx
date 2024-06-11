export type MessageProps = {
  children: string;
  isMe?: boolean;
};

export function Message({ children, isMe }: MessageProps) {
  return (
    <div className="rounded-md p-2">
      {isMe ? (
        <div className="float-end w-fit max-w-80 rounded-3xl rounded-br-sm bg-primary p-3 text-primary-foreground">
          {children}
        </div>
      ) : (
        <div className=" w-fit max-w-80 rounded-3xl rounded-bl-sm bg-secondary p-3 text-secondary-foreground">
          {children}
        </div>
      )}
    </div>
  );
}
